navigator.serviceWorker.register('/js/serviceworker.js');
if ('serviceWorker' in navigator)
{
    
}
else
{
    log("serviceworker not supported");
}