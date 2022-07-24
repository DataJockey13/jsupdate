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
    console.log("service-channel message received: " + event.data);
};

const serviceWorkerMessage = (msg) => {
    broadcast.postMessage(msg, {source: "app"});
}