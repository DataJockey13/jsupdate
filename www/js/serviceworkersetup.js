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

const serviceWorkerMessage = (msg) => {
    navigator.serviceWorker.controller.postMessage(msg.text);
}