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
    if (event.data)
    {
        log("serviceworker: " + event.data);
    }
    else
    {
        log("serviceworker: " + event);
    }  
};

const serviceWorkerMessage = (msg) => {
    broadcast.postMessage(msg);
}