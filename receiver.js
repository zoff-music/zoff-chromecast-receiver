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

//cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

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
          startSeconds = json_parsed.start;
          endSeconds = json_parsed.end;
          if(prev_video != videoId){
            player.loadVideoById({'videoId': json_parsed.videoId, 'startSeconds': startSeconds, 'endSeconds': endSeconds});
          }
          if(json_parsed.seekTo){
            player.seekTo(json_parsed.seekTo + startSeconds);
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
            clearTimeout(hide_timer);
            hide_timer = setTimeout(function() {
              hidden_info = true;
              $("#title").fadeOut();
              $("#next_song").fadeOut();
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
        $("#next_song").css("display", "flex");

        clearTimeout(hide_timer);
        hide_timer = setTimeout(function() {
          hidden_info = true;
          $("#title").fadeOut();
          $("#next_song").fadeOut();
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
            if(prev_video != videoId){
              player.loadVideoById({'videoId': videoId, 'startSeconds': s, 'endSeconds': e});
            }
            if(seekTo){
              player.seekTo(seekTo);
            }
          }
        });

        socket.on('connect_failed', function(){
            if(!connect_error){
                connect_error = true;
            }
        });

        socket.on("connect_error", function(){
            if(!connect_error){
                connect_error = true;
            }
        });

        socket.on("connect", function(){
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
          $("#next_title_content").html("Next Song:<br>" + nextTitle);
          $("#next_pic").attr("src", "//img.youtube.com/vi/"+nextVideo+"/mqdefault.jpg");
          $("#next_song").css("display", "flex");

          clearTimeout(hide_timer);
          hide_timer = setTimeout(function() {
            hidden_info = true;
            $("#title").fadeOut();
            $("#next_song").fadeOut();
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

    if(duration - currDurr <= 15 && hidden_info) {
      clearTimeout(hide_timer);
      hidden_info = false;
      $("#title").fadeIn();
      $("#next_song").fadeIn();
    }
    document.getElementById("title_cont").innerHTML = player.getVideoData().title;
    document.getElementById("duration").innerHTML = pad(minutes)+":"+pad(seconds)+" <span id='dash'>/</span> "+pad(dMinutes)+":"+pad(dSeconds);
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

function onPlayerReady() {
  window.castReceiverManager.start(appConfig);
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
}

function errorHandler(event){
  if(event.data == 5 || event.data == 100 ||
    event.data == 101 || event.data == 150){
      customMessageBus.broadcast(JSON.stringify({type: 0, videoId: videoId, data_code: event.data }));
  }
}

function onPlayerStateChange(event) {
	if (event.data==YT.PlayerState.ENDED) {
    if(mobile_hack && socket) {
      socket.emit("end", {id: videoId, channel: channel, pass: userpass});
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
        $("#title").fadeOut();
        $("#next_song").fadeOut();
      }, 15000);
    }
  }
}
