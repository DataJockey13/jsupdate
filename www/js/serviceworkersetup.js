if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('/js/serviceworker.js');   
    log("serviceworker registered"); 
}
else
{
    log("serviceworker not supported");
}