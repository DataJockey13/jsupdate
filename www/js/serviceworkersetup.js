if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('/js/serviceworker.js');

    const serviceWorkerMessage = (msg) => {
        navigator.serviceWorker.controller.postMessage(msg);
    }

    navigator.serviceWorker.onmessage = (event) => {
        log(event);
    }

    log("serviceworker registered"); 
}
else
{
    log("serviceworker not supported");
}