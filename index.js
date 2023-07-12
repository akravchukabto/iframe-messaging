let iframe;

window.onmessage = function(e) {
  console.log('parent window.onmessage data: '+ JSON.stringify(e.data));

  if (e.data === 'iframe.close') {
    iframe && iframe.remove();
    document.getElementById("openIframeBtn").style.display = "block";
  }
  let msgEl = document.createElement('p');
  msgEl.innerHTML = `${ Date.now() + ':' + JSON.stringify(e.data)}`;
  document.getElementById("iframe-messages").appendChild(msgEl);
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("parent DOMContentLoaded");

  // document.getElementById("sendIframeEventBtn").addEventListener("click", (e) => {
  //   let eventData = document.getElementById('eventData').value;
  //   console.log('sendIframeEventBtn', eventData);
  //   window.top.postMessage(eventData, '*');

  //   iframe?.contentWindow.postMessage('msg from parent: ' + eventData, '*');
  // });

  document.getElementById("openIframeBtn").addEventListener("click", (e) => {
    console.log('openIframeBtn');
    document.getElementById("openIframeBtn").style.display = "none";

    iframe = document.createElement('iframe');
    iframe.allow="autoplay; camera; microphone";
    // iframe.src = 'iframe.html';
    iframe.id = 'iframe-video';
    iframe.src = 'https://akravchukabto.github.io/iframe-messaging/iframe.html';
    document.getElementById("iframe-place").appendChild(iframe);
  });

});