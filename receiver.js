var ytReady     = false;
var videoId     = null;
var seekTo      = null;
var nextVideo   = null;
var loading     = false;
var initial     = true;

//cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:zoff.me');
customMessageBus.onMessage = function(event) {
  var json_parsed = JSON.parse(event.data);
  switch(json_parsed.type){
    case "loadVideo":
      if(ytReady){
        loading = true;
        prev_video = videoId;
        videoId = json_parsed.videoId;
        if(prev_video != videoId){
          player.loadVideoById(json_parsed.videoId);
        }
        if(json_parsed.seekTo){
          player.seekTo(json_parsed.seekTo);
        }
        if(initial){
          $("#player").toggleClass("hide");
          $(".uil-ring-css").toggleClass("hide");
          $("#zoff-logo").toggleClass("center");
          $("#zoff-logo").toggleClass("lower_left");
          initial = false;
          durationSetter();
        }
      } else {
        videoId = json_parsed.videoId;
        if(json_parsed.seekTo){
          seekTo = json_parsed.seekTo;
        }
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
    case "seekTo":
      player.seekTo(json_parsed.seekTo);
      break;
    case "nextVideo":
      nextVideo = json_parsed.videoId;
      nextTitle = json_parsed.title;
      $("#next_title_content").html("Next Song:<br>" + nextTitle);
      $("#next_pic").attr("src", "//img.youtube.com/vi/"+nextVideo+"/mqdefault.jpg");
      $("#next_song").css("display", "flex");
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
    duration = player.getDuration();
    dMinutes = Math.floor(duration / 60);
    dSeconds = duration - dMinutes * 60;
    currDurr = player.getCurrentTime() !== undefined ? Math.floor(player.getCurrentTime()) : seekTo;
    if(currDurr > duration)
        currDurr = duration;
    minutes = Math.floor(currDurr / 60);
    seconds = currDurr - (minutes * 60);
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
    player.loadVideoById(videoId);
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
		customMessageBus.broadcast(JSON.stringify({type: -1, videoId: videoId}));

  } else if(event.data == 1){
    loading = false;
    if(seekTo){
      player.seekTo(seekTo);
      seekTo = null;
    }
  }
}
