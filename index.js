window.onmessage = function(e) {
  alert('parent window.onmessage data: '+ JSON.stringify(e.data));
};

let iframe;

document.addEventListener("DOMContentLoaded", () => {
  console.log("parent DOMContentLoaded");

  document.getElementById("sendIframeEventBtn").addEventListener("click", (e) => {
    let eventData = document.getElementById('eventData').value;
    console.log('sendIframeEventBtn', eventData);
    window.top.postMessage(eventData, '*');

    iframe?.contentWindow.postMessage('msg from parent: ' + eventData, '*');
  });

  document.getElementById("openIframeBtn").addEventListener("click", (e) => {
    console.log('openIframeBtn');
    iframe = document.createElement('iframe');
    iframe.src = 'https://akravchukabto.github.io/iframe-messaging/iframe.html';
    document.body.appendChild(iframe);
  });

});