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
var socket_id;
var socket;
var hide_timer;
var showInfoTimer;
var iframe_player;
var dummy_div;


function setMediaElement() {
    //playerManager.setMediaElement(player);
    //playerManager.setMediaElement(player.a);
    //playerManager.setMediaElement(iframe_player);
    /*dummy_div.removeEventListener("ERROR");
    dummy_div.removeEventListener("error");
    dummy_div.removeEventListener("CLIP_ENDED");
    dummy_div.removeEventListener("clip_ended");
    dummy_div.removeEventListener("STOPPED");
    dummy_div.removeEventListener("stopped");
    dummy_div.removeEventListener("MEDIA_FINISHED");
    dummy_div.removeEventListener("media_finished");
    dummy_div.removeEventListener("LOAD_FAILED");
    dummy_div.removeEventListener("load_failed");*/
    playerManager.setMediaElement(dummy_div);
    /*dummy_div.removeEventListener("ERROR");
    dummy_div.removeEventListener("error");
    dummy_div.removeEventListener("CLIP_ENDED");
    dummy_div.removeEventListener("clip_ended");
    dummy_div.removeEventListener("STOPPED");
    dummy_div.removeEventListener("stopped");
    dummy_div.removeEventListener("MEDIA_FINISHED");
    dummy_div.removeEventListener("media_finished");
    dummy_div.removeEventListener("LOAD_FAILED");
    dummy_div.removeEventListener("load_failed");*/
    setInterval(function() {
        console.log("dispatching");
        dispatch("playing");
        dispatch("PLAYING");
    }, 3000);
}

function setVariables() {
    player.state = "playing";
    iframe_player = player.getIframe();
    iframe_player.contentType = "video";
    iframe_player.state = "playing";
    iframe_player.a = {
        state: player.state
    };
    iframe_player.b = true;
    iframe_player.i = iframe_player.b;
    iframe_player.getState = function() {
        return player.getPlayerState() == 1 ? "PLAYING" : player.getPlayerState() == 2 ? "PAUSED" : "BUFFERING";
    }
    player.setAttribute = function() {
        player.a.setAttribute(arguments[0], arguments[1]);
    }

    player.a.state = player.state;
    player.contentType = "video";
    player.a.contentType = player.contentType;
    player.b = true;
    player.i = true;
    player.getState = function() {
        return player.getPlayerState() == 1 ? "PLAYING" : player.getPlayerState() == 2 ? "PAUSED" : "BUFFERING";
    }
    player.c.getState = player.getState;
    dummy_div = document.getElementById("dummy-div-caf");
    dummy_div.getVolume = function() {
        return {
            volume: player.getVolume() / 100,
            level: player.getVolume() / 100,
        };
    };
    dummy_div.c = {
        getVolume: dummy_div.getVolume
    };
    dummy_div.mediaElement = {
        volume: 0
    };
    dummy_div.volume = 0;
    dummy_div.contentType = "video";
    dummy_div.state = "playing";
    /*dummy_div.volume = 100;
    dummy_div.a.volume = 100;*/
    dummy_div.a = {
        state: player.state,
        volume: 0
    };
    dummy_div.b = true;
    dummy_div.i = iframe_player.b;
    dummy_div.getState = function() {
        return player.getPlayerState() == 1 ? "PLAYING" : player.getPlayerState() == 2 ? "PAUSED" : "BUFFERING";
    }
}

//cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

window.context = cast.framework.CastReceiverContext.getInstance();
var playerManager = context.getPlayerManager();

// intercept the LOAD request to be able to read in a contentId and get data
playerManager.setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
    console.log(loadRequestData);
    var contentId = "https://www.youtube.com/watch?v=" + loadRequestData.media.contentId;
    videoId = loadRequestData.media.contentId;
    loadRequestData.media.contentUrl = contentId;
    loadRequestData.media.streamType = "BUFFERED";
    var customData = loadRequestData.customData;
    if(ytReady) {
        setMediaElement();
        dispatch("loadeddata");
        dispatch("PLAYING");
        dispatch("playing");
        player.loadVideoById(videoId);
    }
    for(var i = 0; i < customData.length; i++) {
        messageHandle({data: customData[i]});
    }

    //loadRequestData.media.metadata =

    return loadRequestData;
    //return true;
});

playerManager.addEventListener(cast.framework.events.category.CORE, event => {
    console.log(event);
});

playerManager.addEventListener(cast.framework.events.category.DEBUG, event => {
    console.log(event);
});

playerManager.setMessageInterceptor(cast.framework.messages.MessageType.MEDIA_STATUS, status => {
    console.log(status);
    status.customData = {};
    //status.playerState = "PLAYING";
    return status;
});

playerManager.setMessageInterceptor(cast.framework.messages.MessageType.PLAY, status => {
    console.log(status);
});

playerManager.setMessageInterceptor(cast.framework.messages.MessageType.SEEK, status => {
    console.log(status);
});

var NAMESPACE = 'urn:x-cast:zoff.me';
//var customMessageBus = context.getCastMessageBus('urn:x-cast:zoff.me');
context.addCustomMessageListener(NAMESPACE, messageHandle);

function messageHandle(event) {
    console.log(event);
    var json_parsed;
    try {
        json_parsed = JSON.parse(event.data);
    } catch(e) {
        json_parsed = event.data;
    }
    console.log(event);
    switch(json_parsed.type){
        case "loadVideo":
            if(!mobile_hack) {
                if(ytReady){
                    loading = true;
                    prev_video = videoId;
                    videoId = json_parsed.videoId;
                    startSeconds = json_parsed.start;
                    endSeconds = json_parsed.end;
                    if(startSeconds == undefined) {
                        startSeconds = 0;
                    }
                    if(endSeconds == undefined) {
                        endSeconds = json_parse.duration;
                    }
                    if(prev_video != videoId){
                        player.loadVideoById({'videoId': json_parsed.videoId, 'startSeconds': startSeconds, 'endSeconds': endSeconds});
                    }
                    if(json_parsed.seekTo){
                        player.seekTo(json_parsed.seekTo + startSeconds);
                    }
                    if(initial){
                        $("#youtube-player").toggleClass("hide");
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
                    if(json_parsed.seekTo){
                        seekTo = json_parsed.seekTo + startSeconds;
                    }
                }
            }
            channel = json_parsed.channel;
            $(".zoff-channel-info").text("/" + channel);
            $(".channel-name-link").text(channel);
            $(".join-info-image").attr("src", "https://chart.googleapis.com/chart?chs=300x300&cht=qr&choe=UTF-8&chld=L|1&chl=https://zoff.me/" + channel);
            break;
        case "playPauseVideo":
            if(player.getPlayerState() == 1) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
            break;
        case "stopVideo":
            player.stopVideo();
            break;
        case "pauseVideo":
            player.pauseVideo();
            break;
        case "playVideo":
            player.playVideo();
            break;
        case "mute":
            player.mute();
            break;
        case "unMute":
            player.unMute();
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
                player.seekTo(json_parsed.seekTo + startSeconds);
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
            adminpass = json_parsed.adminpass;
            userpass = json_parsed.userpass;
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
                socket.emit('pos', {channel: channel, pass: userpass});
                socket.on("np", function(msg) {
                    console.log("Gotten np");
                    console.log(msg);
                    if(msg.np) {
                        var conf       = msg.conf[0];
                        var time       = msg.time;
                        var seekTo     = time - conf.startTime;
                        prev_video = videoId;
                        videoId = msg.np[0].id;
                        startSeconds = msg.np[0].start;
                        endSeconds = msg.np[0].end;
                        if(startSeconds == undefined) {
                            startSeconds = 0;
                        }
                        if(endSeconds == undefined) {
                            endSeconds = msg.np[0].duration;
                        }
                        //if(prev_video != videoId){
                        player.loadVideoById({'videoId': videoId, 'startSeconds': startSeconds, 'endSeconds': endSeconds});
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
                            player.seekTo(seekTo);
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
                        socket.emit('pos', {channel: channel, pass: userpass});
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
var appConfig = new cast.framework.CastReceiverOptions();

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
appConfig.maxInactivity = 86400;

window.context.addEventListener('SENDER_DISCONNECTED', function(event) {
    console.log(event);
    if(window.context.getSenders().length == 0 &&
    event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
        window.close();
    }
});

window.addEventListener('load', function() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    dummy_div.addEventListener("ended", function() {
        dummy_div.currentTime = 0;
        dummy_div.load();
        dummy_div.volume = 0;
    });
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

        if(endSeconds - player.getCurrentTime() <= 15 && hidden_info) {
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
        if($("#title_cont").text() != player.getVideoData().title) {
            $("#title_cont").text(player.getVideoData().title);
        }
        $("#duration").html(pad(minutes)+":"+pad(seconds)+" <span id='dash'>/</span> "+pad(dMinutes)+":"+pad(dSeconds));
        if(player.getCurrentTime() > endSeconds) {
            if(mobile_hack && socket) {
                socket.emit("end", {id: videoId, channel: channel, pass: userpass});
            } else {
                context.sendCustomMessage(NAMESPACE, undefined, JSON.stringify({type: -1, videoId: videoId}));
            }
        }
    }catch(err){}
    setTimeout(durationSetter, 1000);
}

function pad(n){
    return n < 10 ? "0"+Math.floor(n) : Math.floor(n);
}

var playerData;
var playerDataBinder;

function onYouTubeIframeAPIReady() {
// Trying to hook up with events from youtube
    playerData = {
        "PLAYING": YT.PlayerState.PLAYING,
        "PAUSED": YT.PlayerState.PAUSED,
        "BUFFERING": YT.PlayerState.BUFFERING,
        "LOADING": YT.PlayerState.UNSTARTED,
        "playing": YT.PlayerState.PLAYING,
        "paused": YT.PlayerState.PAUSED,
        "buffering": YT.PlayerState.BUFFERING,
        "loading": YT.PlayerState.UNSTARTED,
        1: "playing",
        2: "paused",
    };
    playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);
    console.log("yes");
    playerDataBinder.addEventListener(
        cast.framework.ui.PlayerDataEventType.STATE_CHANGED,
        e => {
          switch (e.value) {
            case cast.framework.ui.State.LAUNCHING:
                console.log("Player is LAUNCHING");
            case cast.framework.ui.State.IDLE:
                console.log("Player is IDLE");
                console.log(e);
                break;
            case cast.framework.ui.State.LOADING:
                console.log("Player is LOADING");
                break;
            case cast.framework.ui.State.BUFFERING:
                console.log("Player is BUFFERING");
                break;
            case cast.framework.ui.State.PAUSED:
                console.log("Player is PAUSED");
                break;
            case cast.framework.ui.State.PLAYING:
                console.log("Player is PLAYING");
                break;
          }
      });
    player = new YT.Player('youtube-player', {
        height: 562,
        width: 1000,
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            rel:"0",
            wmode:"transparent",
            iv_load_policy: "3",
            showinfo: "0",
            origin: "https://cast.zoff.me"
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': errorHandler
        }
    });



    //playerManager.setMediaElement(player);
    //playerManager.setMediaElement(document.getElementById("youtube-player"));

}

function onPlayerReady() {
    setVariables();
    try {
        dispatch("loadeddata");
        /*player.b.dispatchEvent(new Event("PLAYING"));
        player.b.dispatchEvent(new Event("playing"));
        player.dispatchEvent(new Event("playing"));
        player.dispatchEvent(new Event("PLAYING"));*/
        dispatch("PLAYING");
        dispatch("playing");
        dispatch("play");
    } catch(e) {
        console.error("Dispatching event failed", e);
    }
    setMediaElement();

    context.start(appConfig);
    //context.setApplicationState("Ready to play");
    ytReady = true;
    if(videoId){
        loading = true;
        player.loadVideoById({'videoId': videoId, 'startSeconds': startSeconds, 'endSeconds': endSeconds});
        player.playVideo();
        if(seekTo){
            player.seekTo(seekTo);
            seekTo = null;
        }
    }
    //cast.framework.PlayerManager.setMediaElement(document.getElementById("youtube-player"));
}

function errorHandler(event){
    if(event.data == 5 || event.data == 100 ||
        event.data == 101 || event.data == 150){
            if(mobile_hack && socket) {
                curr_playing = player.getVideoUrl().replace("https://www.youtube.com/watch?v=", "");
                socket.emit("skip", {
                    error: event.data,
                    id: videoId,
                    pass: adminpass,
                    channel: channel.toLowerCase(),
                    userpass: userpass
                });
            } else {
                context.sendCustomMessage(NAMESPACE, undefined, JSON.stringify({type: 0, videoId: videoId, data_code: event.data }));
            }
    }
}

function onPlayerStateChange(event) {
    if (event.data==YT.PlayerState.ENDED) {
        if(mobile_hack && socket) {
            socket.emit("end", {id: videoId, channel: channel, pass: userpass});
        } else {
            context.sendCustomMessage(NAMESPACE, undefined, JSON.stringify({type: -1, videoId: videoId}));
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
        var mediaInfo = generateMediaInfo();
        //setMediaElement()
        //playerManager.setMediaInformation(mediaInfo, true);
        context.setApplicationState(player.getVideoData().title);
        dispatch("PLAYING");
        dispatch("playing");
        dispatch("play");
        //cast.framework.PlayerManager.setMediaInformation(mediaInfo, true);
        context.sendCustomMessage(NAMESPACE, undefined, JSON.stringify({type: 1}));
    } else if(event.data == 2) {
        dispatch("PAUSED");
        dispatch("paused");
        dispatch("pause");
        context.sendCustomMessage(NAMESPACE, undefined, JSON.stringify({type: 2}));
    }
}

function generateMediaInfo() {
    var metadata = new cast.framework.messages.GenericMediaMetadata();
    metadata.images = "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
    metadata.title = player.getVideoData().title;
    metadata.volume = 1;
    var mediaInfo = new cast.framework.messages.MediaInformation();
    mediaInfo.contentId = "https://youtube.com/watch/?v=" + videoId;
    mediaInfo.contentType = "video/*";
    mediaInfo.duration = endSeconds - startSeconds;
    mediaInfo.metadata = metadata;
    mediaInfo.volume = 1;
    return mediaInfo;
}

function dispatch(evt) {
    try {
        var event = new Event(evt);
        window.dispatchEvent(event);
        document.dispatchEvent(event);
        player.a.dispatchEvent(event);
        iframe_player.dispatchEvent(event);
        dummy_div.dispatchEvent(event);
    } catch(e) {
        console.error("Error dispatching something", e);
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
