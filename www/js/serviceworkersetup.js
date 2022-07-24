if ('serviceworker' in navigator)
{
    navigator.serviceWorker.register('/js/serviceworker.js');
}
else
{
    log("serviceworker not supported");
}