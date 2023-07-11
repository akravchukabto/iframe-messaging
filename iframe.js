window.onmessage = function(e) {
  alert('iframe window.onmessage data: '+ JSON.stringify(e.data));
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  document.getElementById("sendIframeEventBtn").addEventListener("click", (e) => {
    let eventData = document.getElementById('eventData').value;
    console.log('sendIframeEventBtn', eventData);
    window.top.postMessage('msg from iframe: ' + eventData, '*');
  });


  var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var errBack = function(e) {
    	console.log('An error has occurred!', e)
    };

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function(stream) {
            video.srcObject=stream;
            video.play();
        });
    }

    var mediaConfig =  { video: true };

    //
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

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function() {
      context.drawImage(video, 0, 0, 640, 480);
    });
});