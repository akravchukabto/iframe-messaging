window.onmessage = function(e) {
  console.log('iframe window.onmessage data: '+ JSON.stringify(e.data));
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("iframe DOMContentLoaded");

  // document.getElementById("sendIframeEventBtn").addEventListener("click", (e) => {
  //   let eventData = document.getElementById('eventData').value;
  //   console.log('sendIframeEventBtn', eventData);
  //   window.top.postMessage('msg from iframe: ' + eventData, '*');
  // });
  
  document.getElementById("finishExerciseBtn").addEventListener("click", (e) => {
    window.top.postMessage('iframe.close', '*');
  });

  const video = document.getElementById('video');

  const errBack = function(e) {
    console.log('An error has occurred!', e)
  };

  const mediaConfig =  { 
    video: true,
    // audio: true
  };

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
          video.srcObject=stream;
          video.play();
      });
  }

  /* Legacy code below! */
  else if (navigator.getUserMedia) { // Standard
      navigator.getUserMedia(mediaConfig, function(stream) {
          video.src = stream;
          video.play();
      }, errBack);
  } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
      navigator.webkitGetUserMedia(mediaConfig, function(stream) {
          video.src = window.webkitURL.createObjectURL(stream);
          video.play();
      }, errBack);
  } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
      navigator.mozGetUserMedia(mediaConfig, function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
      }, errBack);
  }
});