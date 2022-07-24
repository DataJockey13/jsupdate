navigator.serviceWorker.register('/js/serviceworker.js');
if ('serviceworker' in navigator)
{
    
}
else
{
    log("serviceworker not supported");
}