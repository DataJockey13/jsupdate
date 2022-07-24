if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('/js/serviceworker.js');
    navigator.serviceWorker.onmessage = (event) => {
        log("serviceworker: " + event.data);            
    }

    log("serviceworker registered"); 
}
else
{
    log("serviceworker not supported");
}