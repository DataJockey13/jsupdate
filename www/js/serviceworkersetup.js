if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('/js/serviceworker.js');

    navigator.serviceWorker.onmessage = (event) => {
        if (event.data)
        {
            log("serviceworker: " + event.data);
        }
        else
        {
            log("serviceworker: " + event);
        }        
    }

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
        log("serviceworker(bc): " + event.data);
    }
    else
    {
        log("serviceworker(bc): " + event);
    }  
};

const serviceWorkerMessage = (msg) => {
    broadcast.postMessage(msg);
   // navigator.serviceWorker.controller.postMessage(msg.text);
}