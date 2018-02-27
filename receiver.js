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

//cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

window.context = cast.framework.CastReceiverContext.getInstance();
var playerManager = context.getPlayerManager();

// intercept the LOAD request to be able to read in a contentId and get data
playerManager.setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
    console.log(loadRequestData);
    var contentId = "https://www.youtube.com/watch?v=" + loadRequestData.media.contentId;
    video_id = loadRequestData.media.contentId;
    loadRequestData.media.contentUrl = contentId;
    loadRequestData.media.streamType = "BUFFERED";
    var customData = loadRequestData.customData;
    if(ytReady) {
        playerManager.setMediaElement(player);
        //playerManager.setMediaElement(document.getElementById("youtube-player"));
        player.loadVideoById(video_id);
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
    status.playerState = "PLAYING";
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

const playerData = {};
const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);

/// Update ui according to player state
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

window.addEventListener('load', function() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

function pad(n){
    return n < 10 ? "0"+Math.floor(n) : Math.floor(n);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: 562,
        width: 1000,
        playerVars: { 'autoplay': 0, 'controls': 0, rel:"0", wmode:"transparent", iv_load_policy: "3", showinfo: "0"},
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
    player.setAttribute = function() {
        player.a.setAttribute(arguments[0], arguments[1]);
    }
    player.state = "playing";
    playerManager.setMediaElement(player);
    //playerManager.setMediaElement(document.getElementById("youtube-player"));
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
        player.a.dispatchEvent(new Event("PLAYING"));
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
        var metadata = new cast.framework.messages.GenericMediaMetadata();
        metadata.images = "https://img.youtube.com/vi/" + video_id + "/mqdefault.jpg";
        metadata.title = player.getVideoData().title;
        var mediaInfo = new cast.framework.messages.MediaInformation();
        mediaInfo.contentId = "https://youtube.com/watch/?v=" + video_id;
        mediaInfo.contentType = "video/*";
        mediaInfo.duration = endSeconds - startSeconds;
        mediaInfo.metadata = metadata;
        playerManager.setMediaElement(player);
        playerManager.setMediaInformation(mediaInfo, true);
        context.setApplicationState(player.getVideoData().title);
        //cast.framework.PlayerManager.setMediaInformation(mediaInfo, true);
        context.sendCustomMessage(NAMESPACE, undefined, JSON.stringify({type: 1}));
    } else if(event.data == 2) {
        context.sendCustomMessage(NAMESPACE, undefined, JSON.stringify({type: 2}));
    }
}
