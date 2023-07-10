window.onmessage = function(e) {
  alert('iframe window.onmessage data: '+ JSON.stringify(e.data));
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  document.getElementById("sendIframeEventBtn").addEventListener("click", (e) => {
    let eventData = document.getElementById('eventData').value;
    console.log('sendIframeEventBtn', eventData);
    window.top.postMessage(eventData, '*');
  });

});