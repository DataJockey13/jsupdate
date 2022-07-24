if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('/serviceworker.js');
    log("serviceworker registered"); 
}
else
{
    log("serviceworker not supported");
}

const broadcast = new BroadcastChannel('service-channel');
broadcast.onmessage = (event) => {
    console.log("service-channel: message received: " + event.data);
    console.log("service-channel: message received from origin: " + event.origin);
    console.log("service-channel: message received from source: " + event.source);
};

const serviceWorkerMessage = (msg) => {
    broadcast.postMessage(msg);
}