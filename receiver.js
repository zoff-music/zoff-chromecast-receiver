var ytReady     = false;
var videoId     = null;
var seekTo      = null;
var nextVideo   = null;
var loading     = false;
var initial     = true;
var hidden_info = false;
var started = false;
var mobile_hack = false;
var connect_error = false;
var startSeconds = 0;
endSeconds = 99999;
var channel;
var guid;
var adminpass;
var userpass;
var thumbnail;
var socket_id;
var socket;
var hide_timer;
var showInfoTimer;
var videoSource = "";
var soundcloud_player = {
    seek: function(){},
    play: function(){},
    pause: function(){},
    setVolume: function(){}
}

/*
cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

cast.receiver.MediaManager.customizedStatusCallback = function (mediaStatus) {
    console.log(mediaStatus);
    return getCurrentData();
}

cast.receiver.MediaManager.prototype.customizedStatusCallback = function (mediaStatus) {
    console.log(mediaStatus);
    return getCurrentData();
}*/

//cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

function seekTo(value) {
    if(videoSource != "soundcloud") {
        player.seekTo(value)
    } else {
        soundcloud_player.seek(value * 1000);
    }
}

function pauseVideo() {
    if(videoSource != "soundcloud") {
        player.pauseVideo()
    } else {
        soundcloud_player.pause();
    }
}

function stopVideo() {
    if(videoSource != "soundcloud") {
        player.stopVideo()
    } else {
        soundcloud_player.pause();
    }
}

function getCurrentTime() {
    if(videoSource != "soundcloud") {
        return player.getCurrentTime();
    } else {
        return Math.floor(soundcloud_player.currentTime() / 1000);
    }
}

function playVideo() {
    if(videoSource != "soundcloud") {
        player.playVideo()
    } else {
        soundcloud_player.play();
    }
}

function loadVideoById(id, start, end) {
    if(videoSource != "soundcloud") {
        soundcloud_player.pause();
        if(!$("#player_overlay").hasClass("hide")) {
            $("#player_overlay").addClass("hide");
        }
        player.loadVideoById({'videoId': id, 'startSeconds': start, 'endSeconds': end});
    } else {
        try {
            player.stopVideo();
        } catch(e) {}
        SC.stream("/tracks/" + id).then(function(_player){
            soundcloud_player = _player;
            soundcloud_player.bind("finish", soundcloudFinish);
            soundcloud_player.bind("pause", soundcloudPause);
            soundcloud_player.bind("play", soundcloudPlay);
            $("#player_overlay").removeClass("hide");
            $("#player_overlay").css("background",  "url('" + thumbnail + "')");
            $("#player_overlay").css("background-size", "auto");
            $("#player_overlay").css("background-position", "20%");
            $("#player_overlay").css("background-color", "#2d2d2d");
            SC.get('/tracks', {
                ids: id
            }).then(function(tracks) {
                var sound = tracks[0];
                /*Helper.removeClass(".soundcloud_info_container", "hide");
                document.querySelector("#soundcloud_listen_link").href = sound.permalink_url;
                document.querySelector(".soundcloud_info_container .green").href = sound.purchase_url;
                document.querySelector(".soundcloud_info_container .red").href = sound.user.permalink_url;*/
            });
            _player.play().then(function(){
                seekTo(seekTo);
            }).catch(function(e){
            });
          });
    }
}

function getPlayerState() {
    if(videoSource != "soundcloud") {
        return player.getPlayerState()
    } else {
        if(soundcloud_player.getState() == "playing") return YT.PlayerState.PLAYING;
        else if(soundcloud_player.getState() == "paused") return YT.PlayerState.PAUSED;
        else return YT.PlayerState.ENDED;
    }
}

function mute() {
    if(videoSource != "soundcloud") {
        player.mute()
    }
}

function unMute() {
    if(videoSource != "soundcloud") {
        player.unMute()
    }
}

function soundcloudFinish() {
    if(videoSource != "soundcloud") return;
    customMessageBus.broadcast(JSON.stringify({type: 0, videoId: videoId, data_code: YT.PlayerState.ENDED }));
}

function soundcloudPause() {
    if(videoSource != "soundcloud") return;
    customMessageBus.broadcast(JSON.stringify({type: 0, videoId: videoId, data_code: YT.PlayerState.PAUSED }));
}

function soundcloudPlay() {
    if(videoSource != "soundcloud") return;
    customMessageBus.broadcast(JSON.stringify({type: 0, videoId: videoId, data_code: YT.PlayerState.PLAYING }));
}

window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:zoff.me');
customMessageBus.onMessage = function(event) {
    var json_parsed = JSON.parse(event.data);
    console.log(event);
    switch(json_parsed.type){
        case "loadVideo":
            if(!mobile_hack) {
                if(ytReady){
                    loading = true;
                    prev_video = videoId;
                    videoId = json_parsed.videoId;
                    videoSource = json_parse.source;
                    thumbnail = json_parse.thumbnail;
                    startSeconds = json_parsed.start;
                    endSeconds = json_parsed.end;
                    if(startSeconds == undefined) {
                        startSeconds = 0;
                    }
                    if(endSeconds == undefined) {
                        endSeconds = json_parse.duration;
                    }
                    if(prev_video != videoId){
                        loadVideoById(json_parsed.videoId, startSeconds, endSeconds);
                    }
                    if(json_parsed.seekTo){
                        seekTo(json_parsed.seekTo + startSeconds);
                    }
                    if(initial){
                        $("#player").toggleClass("hide");
                        $(".uil-ring-css").toggleClass("hide");
                        $(".zoff-info").toggleClass("center");
                        $(".zoff-info").toggleClass("lower_left");
                        $(".zoff-channel-info").toggleClass("hide");
                        initial = false;
                        durationSetter();
                    }
                    if(started) {
                        //$("#title").fadeIn();
                        if(!$("#title").hasClass("slid-in-title")) {
                            $("#title").addClass("slid-in-title");
                        }
                        if(!$("#next_song").hasClass("slid-in")) {
                            $("#next_song").addClass("slid-in");
                        }
                        clearTimeout(hide_timer);
                        hide_timer = setTimeout(function() {
                            hidden_info = true;
                            //$("#title").fadeOut();
                            $("#title").removeClass("slid-in-title");
                            $("#next_song").removeClass("slid-in");

                        }, 15000);
                    }
                } else {
                    videoId = json_parsed.videoId;
                    videoSource = json_parse.source;
                    if(json_parsed.seekTo){
                        seekTo = json_parsed.seekTo + startSeconds;
                    }
                }
            }
            channel = json_parsed.channel;
            $(".zoff-channel-info").text("/" + channel);
            $(".channel-name-link").text(channel);
            $(".join-info-image").attr("src", "https://chart.googleapis.com/chart?chs=300x300&cht=qr&choe=UTF-8&chld=L|1&chl=https://client.zoff.me/" + channel);
            break;
        case "playPauseVideo":
            if(getPlayerState() == 1) {
                pauseVideo();
            } else {
                playVideo();
            }
            break;
        case "stopVideo":
            stopVideo();
            break;
        case "pauseVideo":
            pauseVideo();
            break;
        case "playVideo":
            playVideo();
            break;
        case "mute":
            mute();
            break;
        case "unMute":
            unMute();
            break;
        case "showJoinInfo":
            clearTimeout(showInfoTimer);
            $(".join-info-full").removeClass("no-opacity");
            showInfoTimer = setTimeout(function () {
                if(!$(".join-info-full").hasClass("no-opacity")) {
                    $(".join-info-full").addClass("no-opacity");
                }
            }, 15000);
            break;
        case "seekTo":
            if(!mobile_hack) {
                seekTo(json_parsed.seekTo + startSeconds);
            }
            break;
        case "nextVideo":
            if(!mobile_hack) {
                nextVideo = json_parsed.videoId;
                nextTitle = json_parsed.title;
                $("#next_title_content").html("Next Song:<br>" + nextTitle);
                $("#next_pic").attr("src", "//img.youtube.com/vi/"+nextVideo+"/mqdefault.jpg");
                if(!$("#next_song").hasClass("slid-in")) {
                    $("#next_song").addClass("slid-in");
                }

                clearTimeout(hide_timer);
                hide_timer = setTimeout(function() {
                    hidden_info = true;
                    //$("#title").fadeOut();
                    $("#title").removeClass("slid-in-title");
                    $("#next_song").removeClass("slid-in");
                }, 15000);
            }
            break;
        case "mobilespecs":
            socket_id = json_parsed.socketid;
            guid = json_parsed.guid;
            if(json_parsed.adminpass) {
                adminpass = json_parsed.adminpass;
            }
            if(json_parsed.userpass) {
                userpass = json_parsed.userpass;
            }
            //adminpass = json_parsed.adminpass;
            //userpass = json_parsed.userpass;
            channel = json_parsed.channel;
            mobile_hack = true;

            var oScript = document.createElement("script");
            oScript.type = "text\/javascript";
            oScript.onload = function() {
                socket = io.connect('https://zoff.me:8080', {
                    'sync disconnect on unload':true,
                    'secure': true,
                    'force new connection': true
                });

                console.log("Tried to connect to socket.io zoff");

                socket.emit('chromecast', {guid: guid, socket_id: socket_id, channel: channel});
                var pos = {channel: channel};
                if(userpass) pos.pass = userpass;
                socket.emit('pos', pos);//, pass: userpass});
                socket.on("np", function(msg) {
                    console.log("Gotten np");
                    console.log(msg);
                    if(msg.np) {
                        var conf       = msg.conf[0];
                        var time       = msg.time;
                        var seekTo     = time - conf.startTime;
                        prev_video = videoId;
                        videoId = msg.np[0].id;
                        thumbnail = "";
                        videoSource = "youtube";
                        startSeconds = msg.np[0].start;
                        endSeconds = msg.np[0].end;
                        if(startSeconds == undefined) {
                            startSeconds = 0;
                        }
                        if(endSeconds == undefined) {
                            endSeconds = msg.np[0].duration;
                        }

                        if(msg.np[0].source && msg.np[0].source != "youtube") {
                            videoSource = msg.np[0].source;
                            thumbnail = msg.np[0].thumbnail;
                        }
                        //if(prev_video != videoId){
                        loadVideoById(videoId, startSeconds, endSeconds);
                        //$("#title").fadeIn();
                        if(!$("#title").hasClass("slid-in-title")) {
                            $("#title").addClass("slid-in-title");
                        }
                        if(!$("#next_song").hasClass("slid-in")) {
                            $("#next_song").addClass("slid-in");
                        }
                        clearTimeout(hide_timer);
                        hide_timer = setTimeout(function() {
                            hidden_info = true;
                            //$("#title").fadeOut();
                            $("#title").removeClass("slid-in-title");
                            $("#next_song").removeClass("slid-in");
                        }, 15000);
                        //}
                        if(seekTo){
                            seekTo(seekTo);
                        }
                    }
                });

                socket.on('connect_failed', function(){
                    console.log("connect failed");
                    if(!connect_error){
                        connect_error = true;
                    }
                });

                socket.on("connect_error", function(){
                    console.log("connect error");
                    if(!connect_error){
                        connect_error = true;
                    }
                });

                socket.on("connect", function(){
                    console.log("connected");
                    if(connect_error){
                        connect_error = false;
                        socket.emit('chromecast', {guid: guid, socket_id: socket_id, channel: channel});
                        var pos = {channel: channel};
                        if(userpass) pos.userpass = userpass;
                        socket.emit('pos', pos);//, pass: userpass});
                    }
                });

                socket.on("self_ping", function() {
                    if(channel != undefined && channel.toLowerCase() != "") {
                        socket.emit("self_ping", {channel: channel.toLowerCase()});
                    }
                });

                socket.on("next_song", function(msg) {
                    console.log("Gotten next_song");
                    console.log(msg);
                    nextVideo = msg.videoId;
                    nextTitle = msg.title;
                    $("#next_title_content").html("Next:<br>" + nextTitle);
                    if(msg.source != "soundcloud") {
                        $("#next_pic").attr("src", "//img.youtube.com/vi/"+nextVideo+"/mqdefault.jpg");
                    } else {
                        $("#next_pic").attr("src", msg.thumbnail);
                    }
                    if(!$("#next_song").hasClass("slid-in")) {
                        $("#next_song").addClass("slid-in");
                    }

                    clearTimeout(hide_timer);
                    hide_timer = setTimeout(function() {
                        hidden_info = true;
                        //$("#title").fadeOut();
                        $("#title").removeClass("slid-in-title");
                        $("#next_song").removeClass("slid-in");
                    }, 15000);
                });

            }

            oScript.src = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(oScript, firstScriptTag);
            console.log("Inserted script");
            break;
    }
}
/**
* Application config
**/
var appConfig = new cast.receiver.CastReceiverManager.Config();

/**
* Text that represents the application status. It should meet
* internationalization rules as may be displayed by the sender application.
* @type {string|undefined}
**/
appConfig.statusText = 'Ready to play';

/**
* Maximum time in seconds before closing an idle
* sender connection. Setting this value enables a heartbeat message to keep
* the connection alive. Used to detect unresponsive senders faster than
* typical TCP timeouts. The minimum value is 5 seconds, there is no upper
* bound enforced but practically it's minutes before platform TCP timeouts
* come into play. Default value is 10 seconds.
* @type {number|undefined}
**/
// 100 minutes for testing, use default 10sec in prod by not setting this value
//appConfig.maxInactivity = 6000;

window.castReceiverManager.onSenderDisconnected = function(event) {
    console.log(event);
    if(window.castReceiverManager.getSenders().length == 0 &&
    event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
        window.close();
    }
}

window.addEventListener('load', function() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    tagSearch = document.createElement('script');
    tagSearch.setAttribute("async", true);
    tagSearch.src        = "https://connect.soundcloud.com/sdk/sdk-3.3.0.js";
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tagSearch, firstScriptTag);

    tagSearch.onload = function() {
        SC.initialize({
          client_id: '***REMOVED***'
      }, function() {
          console.log("Loaded streamer");
      });
    }
});

function durationSetter(){
    try{
        duration = endSeconds;//player.getDuration();
        dMinutes = Math.floor(duration / 60);
        dSeconds = duration - dMinutes * 60;
        currDurr = player.getCurrentTime() !== undefined ? Math.floor(player.getCurrentTime()) : seekTo;
        if(currDurr - startSeconds > duration) {
            currDurr = duration - startSeconds;
        }
        currDurr = currDurr - startSeconds;
        minutes = Math.floor(currDurr / 60);
        seconds = currDurr - (minutes * 60);

        if(endSeconds - getCurrentTime() <= 15 && hidden_info) {
            clearTimeout(hide_timer);
            hidden_info = false;
            //$("#title").fadeIn();
            if(!$("#title").hasClass("slid-in-title")) {
                $("#title").addClass("slid-in-title");
            }
            if(!$("#next_song").hasClass("slid-in")) {
                $("#next_song").addClass("slid-in");
            }
        }
        if(videoSource != "soundcloud") {
            if($("#title_cont").text() != player.getVideoData().title) {
                $("#title_cont").text(player.getVideoData().title);
            }
        }
        $("#duration").html(pad(minutes)+":"+pad(seconds)+" <span id='dash'>/</span> "+pad(dMinutes)+":"+pad(dSeconds));
        if(getCurrentTime() + 1 > endSeconds) {
            if(mobile_hack && socket) {
                var end = {id: videoId, channel: channel};
                if(userpass) end.pass = userpass;
                socket.emit("end", end);//, pass: userpass});
            } else {
                customMessageBus.broadcast(JSON.stringify({type: -1, videoId: videoId}));
            }
        }
    }catch(err){}
    setTimeout(durationSetter, 1000);
}

function pad(n){
    return n < 10 ? "0"+Math.floor(n) : Math.floor(n);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: 562,
        width: 1000,
        playerVars: { 'autoplay': 0, 'controls': 0, rel:"0", wmode:"transparent", iv_load_policy: "3", showinfo: "0"},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': errorHandler
        }
    });
}

var mediaElement;
var mediaManager;

function generateData() {
    var metadata = new cast.receiver.media.GenericMediaMetadata()
    metadata.title = player.getVideoData().title;
    metadata.images = "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
    var mediaInfo = new cast.receiver.media.MediaInformation();
    mediaInfo.metadata = metadata;
    mediaInfo.contentId = videoId;
    mediaInfo.contentType = "video/*";
    return mediaInfo;
}

function onPlayerReady() {
    /*player.load = function() {
            return true;
    }
    mediaElement = player;  // eg. <video id='media'/>
    mediaManager = new cast.receiver.MediaManager(mediaElement);
    mediaManager.customizedStatusCallback = function(mediaStatus) {
        console.log(mediaStatus);
        return generateData();
    }*/

    window.castReceiverManager.start(appConfig);
    ytReady = true;
    if(videoId && videoSource == "youtube"){
        loading = true;
        player.loadVideoById({'videoId': videoId, 'startSeconds': startSeconds, 'endSeconds': endSeconds});
        player.playVideo();
        if(seekTo){
            player.seekTo(seekTo);
            seekTo = null;
        }
    } else {
        loadVideoById(videoId, startSeconds, endSeconds);
    }
}

function errorHandler(event){
    if(videoSource == "soundcloud") return;
    if(event.data == 5 || event.data == 100 ||
        event.data == 101 || event.data == 150){
            if(mobile_hack && socket) {
                curr_playing = player.getVideoUrl().replace("https://www.youtube.com/watch?v=", "");
                var skip = {
                    error: event.data,
                    id: videoId,
                    //pass: adminpass,
                    channel: channel.toLowerCase(),
                    //userpass: userpass
                }
                if(userpass) skip.userpass = userpass;
                if(adminpass) skip.pass = adminpass;
                socket.emit("skip", skip);
            } else {
                customMessageBus.broadcast(JSON.stringify({type: 0, videoId: videoId, data_code: event.data }));
            }
    }
}

function getCurrentData() {
    var data = new cast.receiver.media.MediaStatus();
    var extended = new cast.receiver.media.ExtendedMediaStatus();
    extended.playerState = player.getPlayerState() == 1 ? "PLAYING" : player.getPlayerState() == 2 ? "PAUSED" : "BUFFERING";
    extended.opt_media = generateData();
    data.currentItemId = videoId;
    data.extendedStatus = extended;
    data.currentTime = player.getCurrentTime();
    data.playerState = extended.playerState;
    data.volume.level = player.getVolume() / 100;
    data.volume.mute = false;
    data.media = extended.opt_media;
    data.supportedMediaCommands = 15;
    return data;
}

function onPlayerStateChange(event) {
    if(videoSource == "soundcloud") return;
    if (event.data==YT.PlayerState.ENDED) {
        if(mobile_hack && socket) {
            var end = {id: videoId, channel: channel};
            if(userpass) end.pass = userpass;
            socket.emit("end", end);//, pass: userpass});
        } else {
            customMessageBus.broadcast(JSON.stringify({type: -1, videoId: videoId}));
        }

    } else if(event.data == 1){
        loading = false;
        if(seekTo){
            player.seekTo(seekTo);
            seekTo = null;
        }

        if(started == false) {
            started = true;
            clearTimeout(hide_timer);
            hide_timer = setTimeout(function() {
                hidden_info = true;
                //$("#title").fadeOut();
                $("#title").removeClass("slid-in-title");
                $("#next_song").removeClass("slid-in");
            }, 15000);
        }
        //mediaManager.setMediaInformation(generateData(), true);
        //mediaManager.customizedStatusCallback(getCurrentData());
        //mediaManager.broadcastStatus(true);
        customMessageBus.broadcast(JSON.stringify({type: 1}));
    } else if(event.data == 2) {
        //mediaManager.customizedStatusCallback(getCurrentData());
        customMessageBus.broadcast(JSON.stringify({type: 2}));
    }
}

function change_info(info) {
    var qr = info ? "" : "-qr";
    var info_text = info ? "-qr" : "";
    $(".zoff-channel-info" + qr).css("opacity", 0);
    setTimeout(function() {
        $(".zoff-channel-info" + qr).css("display", "none");
        $(".zoff-channel-info" + info_text).css("display", "block");
        $(".zoff-channel-info" + info_text).css("opacity", 1);
        setTimeout(function() {
            change_info(!info);
        }, 10000);
    }, 500);
}
