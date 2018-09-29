var ytReady     = false;
var videoId     = null;
var seekTo      = null;
//var ytPlayers["ytPlayer" + currentYT];
var nextVideo   = null;
var loading     = false;
var initial     = true;
var hidden_info = false;
var currentYT = 0;
var ytPlayers = {};
ytPlayers["ytPlayer" + currentYT] = [];
var SC_widget;
var scCurrentTime = 0;
var currDurr = 0;
var SC_player;
var scUsingWidget = true;
var title = "temptitle";
var started = false;
var previousVideoSource = "";
var mobile_hack = false;
var connect_error = false;
var startSeconds = 0;
var toast_id = 0;
endSeconds = 99999;
var sentEnd = 0;
var channel;
var guid;
var title = "";
var adminpass;
var mediaElement;
var userpass;
var currentSoundcloudVideo = "";
var thumbnail;
var socket_id;
var _socketIo;
var mediaElement;
var mediaManager;
var fooAttributes = {
    setAttribute: function(){
        console.log("setAttribute-thing", arguments);
    },
    removeAttribute: function(){
        console.log("removeAttribute-thing", arguments);
    },
    getAttribute: function(){
        console.log("getAttribute-thing", arguments);
    },
    load: function() {
        console.log("load-thing", arguments);
    },
};
var fooPlayer = {
    c: fooAttributes,
    setAttribute: fooAttributes.setAttribute,
    removeAttribute: fooAttributes.removeAttribute,
    getAttribute: fooAttributes.getAttribute,
    load: fooAttributes.load,
    events: {
        error: function() {

        },
        loadedmetadata: function() {

        },
        ended: function() {

        }
    },
    play: function() {
        if(videoSource == "youtube") {
            ytPlayers["ytPlayer" + currentYT].playVideo();
        } else {
            soundcloud_player.play();
        }
    },
    pause: function() {
        if(videoSource == "youtube") {
            ytPlayers["ytPlayer" + currentYT].pauseVideo();
        } else {
            soundcloud_player.pause();
        }
    },
    currentTime: 0,
    getTitle: function() {
        return title;
    },
    title: title,
    src: videoId,
    getDuration: function() {
        return endSeconds;
    },
    duration: function() {
        return endSeconds;
    },
    addEventListener: function() {
        console.log("addEventListener");
        if(arguments.length > 1) {
            fooPlayer.events[arguments[0]] = arguments[1];
        }
        for(var i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
    },
    attachEvent: function() {
        console.log("attachEvent");
        for(var i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
    }
}
var hide_timer;
var showInfoTimer;
var mobileSpecsAlready = false;
var videoSource = "";
var soundcloud_player = {
    seek: function(){},
    play: function(){},
    pause: function(){},
    setVolume: function(){},
    currentTime: function(){},
    isPlaying: function() {
        return false;
    }
}

function showVideoLoad() {
    $(".uil-ring-css").removeClass("hide");
    $(".uil-ring-css").css("transform", "scale(1)");
    $(".uil-ring-css").css("top", "0");
    $(".uil-ring-css").css("bottom", "0");
    $(".uil-ring-css").css("height", "100%");
    $(".uil-ring-css").css("width", "100%");
    $(".uil-ring-css").css("display", "flex");
    $(".uil-ring-css").css("align-items", "center");
    $(".uil-ring-css").css("justify-content", "center");
    $(".uil-ring-css").css("background", "rgba(0,0,0,.5)");
    $(".uil-ring-css").css("z-index", "9");

}

function hideVideoLoad() {
    $(".uil-ring-css").css("display", "none");
}

mediaElement = fooPlayer;
mediaManager = new cast.receiver.MediaManager(mediaElement);
mediaManager.onLoad = function (event) {
    console.log("onLoad", event);
    if(!mobile_hack) {
        if(ytReady){
            loading = true;
            prev_video = videoId;
            if(event.data.media.contentID) event.data.media.contentId = event.data.media.contentID;
            videoId = event.data.media.contentId;
            if(event.data.media.contentType == "video") {
                videoSource = event.data.media.customData.source;
            } else {
                videoSource = event.data.media.contentType;
            }
            if(videoSource == undefined) videoSource = "youtube";
            thumbnail = event.data.media.customData.thumbnail;
            startSeconds = event.data.media.customData.start;
            endSeconds = event.data.media.customData.end;
            if(startSeconds == undefined) {
                startSeconds = 0;
            }
            if(prev_video != videoId){
                loadVideoById(videoId, startSeconds, endSeconds);
            }
            if(event.data.media.customData.seekTo){
                seekToFunction(event.data.media.customData.seekTo + startSeconds);
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
            videoId = event.data.media.contentId;
            if(event.data.media.contentType == "video/*") {
                videoSource = event.data.media.customData.source;
            } else {
                videoSource = event.data.media.contentType;
            }
            if(event.data.media.customData.seekTo){
                seekTo = event.data.media.customData.seekTo + startSeconds;
            }
        }
        if(!mobile_hack && event.data.media.customData.socket_id && event.data.media.customData.guid) {
            var json_parsed = {};
            json_parsed.socketid = event.data.media.customData.socket_id;
            json_parsed.guid = event.data.media.customData.guid;
            if(event.data.media.customData.adminpass) {
                json_parsed.adminpass = event.data.media.customData.adminpass;
            }
            if(event.data.media.customData.userpass) {
                json_parsed.userpass = event.data.media.customData.userpass;
            }
            //adminpass = json_parsed.adminpass;
            //userpass = json_parsed.userpass;
            json_parsed.channel = event.data.media.customData.channel;
            mobilespecs(json_parsed)
        }
    }

    title = event.data.media.metadata.title;
    castReceiverManager.setApplicationState('Now Playing: ' + title);
    channel = event.data.media.customData.channel;
    $(".zoff-channel-info").text("/" + channel);
    $(".channel-name-link").text(encodeURIComponent(channel));
    $(".join-info-image").attr("src", "https://chart.googleapis.com/chart?chs=300x300&cht=qr&choe=UTF-8&chld=L|1&chl=https://client.zoff.me/r/" + btoa(encodeURIComponent(channel)));
    mediaManager.setMediaInformation(generateData(), true);
    mediaManager.sendLoadComplete();
    mediaManager.setMediaInformation(generateData(), true);
    fooPlayer.events.loadedmetadata();

}

mediaManager.onPlay = function(event) {
    console.log("onPlay", event);
    if(videoSource == "youtube") {
        ytPlayers["ytPlayer" + currentYT].playVideo();
    } else {
        soundcloud_player.play();
    }
}

mediaManager.onPause = function(event) {
    console.log("onPause", event);
    if(videoSource == "youtube") {
        ytPlayers["ytPlayer" + currentYT].pauseVideo();
    } else {
        soundcloud_player.pause();
    }
}

function seekToFunction(value) {
    if(isNaN(value)) return;
    if(videoSource != "soundcloud") {
        try {
            ytPlayers["ytPlayer" + currentYT].seekTo(value)
        } catch(e) {}
    } else {
        soundcloud_player.seek(value * 1000);
    }
}

function pauseVideo() {
    if(videoSource != "soundcloud") {
        ytPlayers["ytPlayer" + currentYT].pauseVideo()
    } else {
        soundcloud_player.pause();
    }
}

function stopVideo() {
    if(videoSource != "soundcloud") {
        ytPlayers["ytPlayer" + currentYT].pauseVideo()
    } else {
        soundcloud_player.pause();
    }
}

function getCurrentTime() {
    if(videoSource != "soundcloud") {
        try {
            return ytPlayers["ytPlayer" + currentYT].getCurrentTime();
        } catch(e) {
            return 0;
        }
    } else {
        if(scUsingWidget) {
            return currDurr;
        } else {
            return Math.floor(soundcloud_player.currentTime() / 1000);
        }
    }
}

function playVideo() {
    if(videoSource != "soundcloud") {
        ytPlayers["ytPlayer" + currentYT].playVideo()
    } else {
        soundcloud_player.play();
    }
}

function clearAllPlayers() {
    try {
        soundcloud_player.unbind("finish", soundcloudFinish);
        soundcloud_player.unbind("pause", soundcloudPause);
        soundcloud_player.unbind("play", soundcloudPlay);
        soundcloud_player = null;
        document.querySelector("#sc_player").innerHTML = "";

        //document.querySelector("#wrapper").insertAdjacentHTML("beforeend", "<div id='player'></div>");
        //videoId = id;
        //onYouTubeIframeAPIReady();
    }catch(e){}

    try {
        console.log("time to destroy");
        ytPlayers["ytPlayer" + currentYT].destroy();
    } catch(e){}
    console.log("destroyed");
    try {
        document.querySelector("#player").remove();
    } catch(e) {}
}

function loadVideoById(id, start, end) {
    console.log("We are trying to load a video now", id, start, end);
    if(id == null) return;
    showVideoLoad();

    console.log("first place: loadVideoById", videoSource, id, start, end);
    if(videoSource == "video") {
        console.log("clearing all players");
        clearAllPlayers();
    } else if(videoSource != "soundcloud") {
        console.log("youtubeplayers");
        if(previousVideoSource == "soundcloud" || previousVideoSource == "") {
            try {
                soundcloud_player.unbind("finish", soundcloudFinish);
                soundcloud_player.unbind("pause", soundcloudPause);
                soundcloud_player.unbind("play", soundcloudPlay);
                soundcloud_player = null;
                document.querySelector("#sc_player").innerHTML = "";

                document.querySelector("#wrapper").insertAdjacentHTML("beforeend", "<div id='player'></div>");
                videoId = id;
                onYouTubeIframeAPIReady();
            }catch(e){}
        }
        try {
            //soundcloud_player.pause();
        } catch(e){}

        if(!$("#player_overlay").hasClass("hide")) {
            $("#player_overlay").addClass("hide");
        }
        try {
            if(ytPlayers["ytPlayer" + currentYT].getVideoUrl().indexOf(id) > -1) {
                ytPlayers["ytPlayer" + currentYT].seekTo(start);
            } else {
                throw "player object not existing yet";
            }
        } catch(e) {
            console.log("first place: loadVideoById", videoSource, id, start, end);
            if(previousVideoSource == "youtube") {
                ytPlayers["ytPlayer" + currentYT].loadVideoById({'videoId': id, 'startSeconds': start, 'endSeconds': end});
            }
        }
        setTimeout(function() {
            try {
                //title = player.getVideoData().title;
            } catch(e) {}
            mediaManager.setMediaInformation(generateData(), true);
            mediaManager.sendLoadComplete();
            mediaManager.setMediaInformation(generateData(), true);
            fooPlayer.events.loadedmetadata();
        }, 1000);
    } else {
        console.log("soundcloudplayers");
        if(previousVideoSource == "youtube" || previousVideoSource == "") {
            try {
                console.log("time to destroy");
                ytPlayers["ytPlayer" + currentYT].destroy();
            } catch(e){}
            console.log("destroyed");
            document.querySelector("#player").remove();
        }
        try {
            //ytPlayers["ytPlayer" + currentYT].pauseVideo();
        } catch(e) {}
        if(currentSoundcloudVideo != id) {
            currentSoundcloudVideo = id;
            if(scUsingWidget) {
                initializeSCWidget(id);
            } else {
                /*
                SC_player.stream("/tracks/" + id).then(function(_player){
                    soundcloud_player = _player;
                    soundcloud_player.bind("finish", soundcloudFinish);
                    soundcloud_player.bind("pause", soundcloudPause);
                    soundcloud_player.bind("play", soundcloudPlay);
                    $("#player_overlay").removeClass("hide");
                    $("#player_overlay").css("background",  "url('" + thumbnail + "')");
                    $("#player_overlay").css("background-size", "auto");
                    $("#player_overlay").css("background-position", "20%");
                    $("#player_overlay").css("background-color", "#2d2d2d");
                    _player.play().then(function(){
                        seekToFunction(start);
                    }).catch(function(e){
                        console.log(e);
                    });

                    mediaManager.setMediaInformation(generateData(), true);
                    mediaManager.sendLoadComplete();
                    mediaManager.setMediaInformation(generateData(), true);
                    fooPlayer.events.loadedmetadata();
                });
                */
            }
        } else {
            soundcloud_player.seek(start * 1000);
        }
    }
    previousVideoSource = videoSource;
}

function initializeSCWidget(id) {
    try {
        soundcloud_player.unbind("finish", soundcloudFinish);
        soundcloud_player.unbind("pause", soundcloudPause);
        soundcloud_player.unbind("play", soundcloudPlay);
        //Player.soundcloud_player.unbind("seek", Player.soundcloudSeek);
    }catch(e){}
    var this_autoplay = "?auto_play=true";
    scUsingWidget = true;
    $("#player_overlay").removeClass("hide");
    $("#player_overlay").css("background",  "url('" + thumbnail + "')");
    $("#player_overlay").css("background-size", "auto");
    $("#player_overlay").css("background-position", "20%");
    $("#player_overlay").css("background-color", "#2d2d2d");
    if(document.querySelectorAll("#scplayerElement").length == 0) {
        var single = "single_active=false";
        single = "&"+single;
        document.querySelector("#sc_player").innerHTML = '<iframe id="scplayerElement" style="opacity:0;position: absolute;top: 0;left: 0;" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay;" \
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + id + this_autoplay + '"> \
        </iframe>';
        addSCWidgetElements();
    } else {
        soundcloud_player.bind("finish", soundcloudFinish);
        soundcloud_player.bind("pause", soundcloudPause);
        soundcloud_player.bind("play", soundcloudPlay);
        soundcloud_player.load('https://api.soundcloud.com/tracks/' + id + this_autoplay, {single_active: false});
    }
}

function addSCWidgetElements() {
    try {
        soundcloud_player = SC_widget.Widget(document.querySelector("#scplayerElement"));
        soundcloud_player.seek = soundcloud_player.seekTo;
        soundcloud_player.bind("finish", soundcloudFinish);
        soundcloud_player.bind("pause", soundcloudPause);
        soundcloud_player.bind("play", soundcloudPlay);
    } catch(e) {
        setTimeout(function() {
            addSCWidgetElements();
        }, 500);
    }
}

function getPlayerState() {
    if(videoSource != "soundcloud") {
        return ytPlayers["ytPlayer" + currentYT].getPlayerState()
    } else {
        if(soundcloud_player.getState() == "playing") return YT.PlayerState.PLAYING;
        else if(soundcloud_player.getState() == "paused") return YT.PlayerState.PAUSED;
        else return YT.PlayerState.ENDED;
    }
}

function mute() {
    if(videoSource != "soundcloud") {
        ytPlayers["ytPlayer" + currentYT].mute()
    }
}

function unMute() {
    if(videoSource != "soundcloud") {
        ytPlayers["ytPlayer" + currentYT].unMute()
    }
}

function soundcloudFinish() {
    if(videoSource != "soundcloud") return;
    customMessageBus.broadcast(JSON.stringify({type: -1, videoId: videoId }));
}

function soundcloudPause() {
    if(videoSource != "soundcloud") return;
    customMessageBus.broadcast(JSON.stringify({type: YT.PlayerState.PAUSED, videoId: videoId }));
}

function soundcloudPlay() {
    console.log("this place");
    if(videoSource != "soundcloud") return;
    hideVideoLoad();
    customMessageBus.broadcast(JSON.stringify({type: YT.PlayerState.PLAYING, videoId: videoId }));
}

window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:zoff.me');
customMessageBus.onMessage = function(event) {
    var json_parsed = JSON.parse(event.data);
    console.log(json_parsed.type, event);
    switch(json_parsed.type){
        case "loadVideo":
        if(!mobile_hack) {
            if(ytReady){
                loading = true;
                prev_video = videoId;
                videoId = json_parsed.videoId;
                videoSource = json_parsed.source;
                if(videoSource == undefined) videoSource = "youtube";
                thumbnail = json_parsed.thumbnail;
                startSeconds = json_parsed.start;
                endSeconds = json_parsed.end;
                if(startSeconds == undefined) {
                    startSeconds = 0;
                }
                if(json_parsed.title) {
                    title = json_parsed.title;
                    castReceiverManager.setApplicationState('Now Playing: ' + title);
                }
                if(endSeconds == undefined) {
                    endSeconds = json_parsed.duration;
                }
                if(prev_video != videoId){
                    loadVideoById(json_parsed.videoId, startSeconds, endSeconds);
                }
                if(json_parsed.seekTo){
                    seekToFunction(json_parsed.seekTo + startSeconds);
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
                videoSource = json_parsed.source;
                if(json_parsed.seekTo){
                    seekTo = json_parsed.seekTo + startSeconds;
                }
            }
        }
        channel = json_parsed.channel;
        $(".zoff-channel-info").text("/" + channel);
        $(".channel-name-link").text(encodeURIComponent(channel));
        $(".join-info-image").attr("src", "https://chart.googleapis.com/chart?chs=300x300&cht=qr&choe=UTF-8&chld=L|1&chl=https://client.zoff.me/r/" + btoa(encodeURIComponent(channel)));
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
            seekToFunction(json_parsed.seekTo + startSeconds);
        }
        break;
        case "nextVideo":
        if(!mobile_hack) {
            nextVideo = json_parsed.videoId;
            if(json_parsed.title) {
                nextTitle = json_parsed.title;
            }

            if(json_parsed.source == "soundcloud") {
                $("#next_pic").attr("src", json_parsed.thumbnail);
            } else {
                $("#next_pic").attr("src", "//img.youtube.com/vi/"+nextVideo+"/mqdefault.jpg");
            }
            $("#next_title_content").html("Next Song:<br>" + nextTitle);

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

            mobilespecs(json_parsed);
            break;
}
};

function mobilespecs(json_parsed) {
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
        _socketIo = io.connect('https://zoff.me:8080', {
            'secure': true,
        });

        console.log("Tried to connect to socket.io zoff");
        console.log("This channel = ", channel);
        var pos = {channel: channel};
        if(userpass) pos.pass = userpass;

        _socketIo.on("np", function(msg) {
            console.log("Gotten np");
            console.log(msg);
            sentEnd = false;
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
                title = msg.np[0].title;
                castReceiverManager.setApplicationState('Now Playing: ' + msg.np[0].title);
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
                loadVideoById(videoId, startSeconds + (time - conf.startTime), endSeconds);
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
                setTimeout(function() {
                    try {
                        if(ytPlayers["ytPlayer" + currentYT].getPlayerState() == -1 && videoSource == "youtube" && ytPlayers["ytPlayer" + currentYT].getCurrentTime() < startSeconds) {
                            seekToFunction(startSeconds);
                            ytPlayers["ytPlayer" + currentYT].playVideo();
                        } else if(videoSource && "soundcloud" && !scUsingWidget && soundcloud_player.currentTime() / 1000 < startSeconds) {
                            seekToFunction(startSeconds);
                            soundcloud_player.play();
                        }
                    } catch(e){
                        seekToFunction(startSeconds);
                        //if(videoSou)
                        //soundcloud_player.play();
                    }
                }, 1500);
                /*if(seekTo){
                seekToFunction(seekTo);
            }*/
        }
    });

    _socketIo.on('connect_failed', function(){
        console.log("connect failed");
        if(!connect_error){
            connect_error = true;
        }
    });

    _socketIo.on("connect_error", function(){
        console.log("connect error");
        if(!connect_error){
            connect_error = true;
        }
    });

    _socketIo.on("reconnect", function(e) {
        console.log("Reconnect event", e);
    });

    _socketIo.on("reconnected", function(e) {
        console.log("Reconnect event", e);
    });

    _socketIo.on("connect", function(){
        console.log("connected to _socketIo.io");
        //if(_socketIo.connected) {
            _socketIo.emit('chromecast', {guid: guid, socket_id: socket_id, channel: channel});
            console.log("emitted chromecast elements");
            var pos = {channel: channel};
            if(userpass) pos.userpass = userpass;
            setTimeout(function() {
                if(_socketIo.connected) {
                    _socketIo.emit('pos', pos);//, pass: userpass});
                    _socketIo.emit('next_song', pos);
                }
            }, 1000);
        //}
        if(connect_error){
            connect_error = false;
            var pos = {channel: channel};
            if(userpass) pos.userpass = userpass;
            if(_socketIo.connected) {
                _socketIo.emit('pos', pos);//, pass: userpass});
            }
        }
    });

    _socketIo.on("self_ping", function() {
        if(channel != undefined && channel.toLowerCase() != "" && _socketIo.connected) {
            _socketIo.emit("self_ping", {channel: channel.toLowerCase()});
        }
    });

    _socketIo.on("channel", function(msg) {
        if(msg.type == "added") {
            var added = msg.value;
            var id = added.id;
            var _title = added.title;
            var new_thumbnail;
            var this_id = toast_id;
            if(added.source == "soundcloud") {
                new_thumbnail = added.thumbnail;
            } else {
                new_thumbnail = "https://img.youtube.com/vi/" + id + "/mqdefault.jpg";
            }

            document.getElementById("toast-container").insertAdjacentHTML("beforeend", '<div class="toast" id="toast-' + toast_id +'"> \
				<div style="display:flex;"> \
					<img id="new_added_song_image" style="height:100px;align-self:center;" src="' + new_thumbnail + '"> \
					<div style="padding-left:32px;padding-right:32px;"> \
						<p>New song added</p> \
						<p id="new_song_added_title">' + _title + '</p> \
					</div> \
				</div> \
			</div>');
            toast_id += 1;
            setTimeout(function() {
                document.getElementById("toast-container").children[0].remove();
            }, 10000);

        }
    });

    _socketIo.on("next_song", function(msg) {
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

oScript.src = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.slim.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(oScript, firstScriptTag);
console.log("Inserted script");
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
    if(document.querySelectorAll("script[src='https://www.youtube.com/iframe_api']").length == 1){
            try{
                //onYouTubeIframeAPIReady();
                //SC.Widget(Player.soundcloud_player).bind("ready", Player.soundcloudReady);

            } catch(error){
                console.error(error);
                console.error("Seems YouTube iFrame script isn't correctly loaded. Please reload the page.");
            }

        } else {
            tag            = document.createElement('script');
            tag.src        = "https://www.youtube.com/iframe_api";
            firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

    /*if(document.querySelectorAll("script[src='https://connect.soundcloud.com/sdk/sdk-3.3.0.js']").length == 1) {
            try {
                if(SC_player != null && SC_player != undefined && SC_widget != null && SC_widget != undefined) {
                    Player.soundcloudReady();
                }
            } catch(error) {
                console.error(error);
                console.error("Seems SoundCloud script isn't correctly loaded. Please reload the page.");
            }
        } else {
            tagSC            = document.createElement('script');
            if (tagSC.readyState){  //IE
                tagSC.onreadystatechange = function(){
                    if (tagSC.readyState == "loaded" ||
                            tagSC.readyState == "complete"){
                        tagSC.onreadystatechange = null;
                        SC_player = SC;
                        SC_player.initialize({
                            client_id: soundcloud_api
                        }, function() {
                        });
                    }
                };
            } else {  //Others
                tagSC.onload = function(){
                    SC_player = SC;
                    SC_player.initialize({
                        client_id: soundcloud_api
                    }, function() {
                    });
                };
            }
            tagSC.src        = "https://connect.soundcloud.com/sdk/sdk-3.3.0.js";
            firstScriptTagSC = document.getElementsByTagName('script')[0];
            firstScriptTagSC.parentNode.insertBefore(tagSC, firstScriptTagSC);
        }*/

        if(document.querySelectorAll("script[src='https://zoff.me/assets/sclib/scapi.js']").length == 1) {
            try {
                /*if(SC_player != null && SC_player != undefined && SC_widget != null && SC_widget != undefined) {
                    Player.soundcloudReady();
                }*/
            } catch(error) {
                //sc_need_initialization = true;
                //console.error(error);
                //console.error("Seems SoundCloud script isn't correctly loaded. Please reload the page.");
            }
        } else {
            tagSCWidget            = document.createElement('script');
            if (tagSCWidget.readyState){  //IE
                tagSCWidget.onreadystatechange = function(){
                    if (tagSCWidget.readyState == "loaded" ||
                            tagSCWidget.readyState == "complete"){
                        tagSCWidget.onreadystatechange = null;
                        SC_widget = SC;
                        /*if(SC_player != null && SC_player != undefined && SC_widget != null && SC_widget != undefined) {
                            Player.soundcloudReady();
                        }*/
                    }
                };
            } else {  //Others
                tagSCWidget.onload = function(){
                    SC_widget = SC;
                    /*if(SC_player != null && SC_player != undefined && SC_widget != null && SC_widget != undefined) {
                        Player.soundcloudReady();
                    }*/
                };
            }
            tagSCWidget.src        = "https://zoff.me/assets/sclib/scapi.js";
            firstScriptTagSCWidget = document.getElementsByTagName('script')[0];
            firstScriptTagSCWidget.parentNode.insertBefore(tagSCWidget, firstScriptTagSCWidget);
        }
});

function durationSetter(){
    try {
        duration = endSeconds - startSeconds;//player.getDuration();
        dMinutes = Math.floor(duration / 60);
        dSeconds = duration - dMinutes * 60;
        if(scUsingWidget && videoSource == "soundcloud") {
            soundcloud_player.getPosition(function(pos) {
                currDurr = Math.floor(pos) / 1000;
            })
        } else {
            currDurr = getCurrentTime() !== undefined ? Math.floor(getCurrentTime()) : seekTo;
        }
        if(currDurr - startSeconds > duration) {
            currDurr = duration - startSeconds;
        }
        currDurr = currDurr - startSeconds;
        minutes = Math.floor(currDurr / 60);
        seconds = currDurr - (minutes * 60);
        fooPlayer.duration = duration;
        fooPlayer.currentTime = getCurrentTime();

        fooPlayer.title = title;
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
        //if(videoSource != "soundcloud") {
        if($("#title_cont").text() != title) {
            $("#title_cont").text(title);
        }
        //}
        $("#duration").html(pad(minutes)+":"+pad(seconds)+" <span id='dash'>/</span> "+pad(dMinutes)+":"+pad(dSeconds));
        if(Math.ceil(getCurrentTime()) + 1 > endSeconds) {
            if(mobile_hack && _socketIo != undefined) {
                var end = {id: videoId, channel: channel};
                if(userpass) end.pass = userpass;
                if(_socketIo.connected && sentEnd < 5) {
                    sentEnd += 1;
                    _socketIo.emit("end", end);//, pass: userpass});
                }
            } else {
                console.log("ended");
                customMessageBus.broadcast(JSON.stringify({type: -1, videoId: videoId}));
            }
        }
    } catch(err) {}
    setTimeout(durationSetter, 1000);
}

function pad(n){
    return n < 10 ? "0"+Math.floor(n) : Math.floor(n);
}

function onYouTubeIframeAPIReady() {
    //if(videoId != undefined) {
        delete ytPlayers["ytPlayer" + currentYT];
        currentYT += 1;
        ytPlayers["ytPlayer" + currentYT] = new YT.Player('player', {
            videoId: videoId,
            height: 562,
            width: 1000,
            playerVars: {rel:"0", autoplay: 1, wmode:"transparent", controls: "0" , fs: "0", iv_load_policy: "3", theme:"light", color:"white", showinfo: 0},
            events: {
                'onReady': onYoutubePlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': errorHandler
            }
        });
        document.querySelector("#player").style.opacity = 0;
    //}
}

function generateData() {
    var metadata = new cast.receiver.media.GenericMediaMetadata()
    if(videoSource == "youtube") {
        metadata.title = title;
        metadata.images = [];
        var image = new cast.receiver.media.Image();
        image.url = "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
        image.width = 320;
        image.height = 180;
        metadata.images.push(image);
        metadata.image = image;
    } else {
        metadata.title = title;
        metadata.images = [];
        var image = new cast.receiver.media.Image();
        image.url = thumbnail;
        metadata.images.push(image);
        metadata.image = image;
    }
    var mediaInfo = new cast.receiver.media.MediaInformation();
    mediaInfo.duration = endSeconds - startSeconds;
    mediaInfo.metadata = metadata;
    mediaInfo.contentId = videoId;
    mediaInfo.contentType = "video/*";
    return mediaInfo;
}

function onYoutubePlayerReady() {
    mediaManager.customizedStatusCallback = function(event) {
        console.log("customized", event);
        var data = new cast.receiver.media.MediaStatus();
        data.mediaSessionId = event.mediaSessionId;
        data.currentTime = getCurrentTime();
        data.media = generateData();
        data.media.streamType = "BUFFERED";
        if(videoSource == "youtube") {
            try {
                switch(ytPlayers["ytPlayer" + currentYT].getPlayerState()){
                    case 1:
                    data.playerState = "PLAYING";
                    break;
                    case 2:
                    data.playerState = "PAUSED";
                    break;
                    case 0:
                    data.playerState = "ENDED";
                    break;
                    default:
                    data.playerState = "PLAYING";
                    break;
                }
            } catch(e) {
                data.playerState = "PLAYING";
            }
        } else {
            if(scUsingWidget) {
                data.playerState = "PLAYING";
            } else {
                if(soundcloud_player.isPlaying()) {
                    data.playerState = "PLAYING";
                } else {
                    data.playerState = "PAUSED";
                }
            }
        }
        return data;
    };

    window.castReceiverManager.start(appConfig);
    mediaManager.setSupportedMediaCommands(1+8+4);
    ytReady = true;
    if(videoId && videoSource == "youtube"){
        loading = true;
        ytPlayers["ytPlayer" + currentYT].loadVideoById({'videoId': videoId, 'startSeconds': startSeconds, 'endSeconds': endSeconds});
        ytPlayers["ytPlayer" + currentYT].playVideo();
        if(seekTo){
            ytPlayers["ytPlayer" + currentYT].seekTo(seekTo);
            seekTo = null;
        }
    } else {
        loadVideoById(videoId, startSeconds, endSeconds);
    }
}

window.onYoutubePlayerReady = onYoutubePlayerReady;

function errorHandler(event){
    if(videoSource == "soundcloud") return;
    if(event.data == 5 || event.data == 100 || event.data == 101 || event.data == 150) {
        if(mobile_hack && _socketIo) {
            curr_playing = ytPlayers["ytPlayer" + currentYT].getVideoUrl().replace("https://www.youtube.com/watch?v=", "");
            var skip = {
                error: event.data,
                id: videoId,
                //pass: adminpass,
                channel: channel.toLowerCase(),
                //userpass: userpass
            }
            if(userpass) skip.userpass = userpass;
            if(adminpass) skip.pass = adminpass;
            if(_socketIo.connected) {
                _socketIo.emit("skip", skip);
            }
        } else {
            customMessageBus.broadcast(JSON.stringify({type: 0, videoId: videoId, data_code: event.data }));
        }
    }
}

function getCurrentData() {
    var data = new cast.receiver.media.MediaStatus();
    var extended = new cast.receiver.media.ExtendedMediaStatus();
    extended.playerState = ytPlayers["ytPlayer" + currentYT].getPlayerState() == 1 ? "PLAYING" : ytPlayers["ytPlayer" + currentYT].getPlayerState() == 2 ? "PAUSED" : "BUFFERING";
    extended.opt_media = generateData();
    data.currentItemId = videoId;
    data.extendedStatus = extended;
    data.currentTime = ytPlayers["ytPlayer" + currentYT].getCurrentTime();
    data.playerState = extended.playerState;
    data.volume.level = ytPlayers["ytPlayer" + currentYT].getVolume() / 100;
    data.volume.mute = false;
    data.media = extended.opt_media;
    data.supportedMediaCommands = 15;
    return data;
}

function onPlayerStateChange(event) {
    if(videoSource == "soundcloud") return;
    if (event.data==YT.PlayerState.ENDED) {
        if(mobile_hack && _socketIo) {
            var end = {id: videoId, channel: channel};
            if(userpass) end.pass = userpass;
            if(_socketIo.connected && sentEnd < 5) {
                sentEnd += 1;
                _socketIo.emit("end", end);//, pass: userpass});
            }
        }

    } else if(event.data == 1){
        hideVideoLoad();
        document.querySelector("#player").style.opacity = 1;
        loading = false;
        if(seekTo){
            ytPlayers["ytPlayer" + currentYT].seekTo(seekTo);
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
