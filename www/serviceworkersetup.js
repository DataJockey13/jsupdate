if ('serviceWorker' in navigator)
{
        navigator.serviceWorker.register('/serviceworker.js', {scope: './'})
        .then( 
            (registration) => {
                console.log('serviceworker registration succeeded:', registration);
                serviceWorkerMessage("clear");
                handleLocation();
            },
            (error) => console.log('serviceworker registration failed:', error)
        );
}
else
{
    log("serviceworker not supported");
}

const broadcast = new BroadcastChannel('service-channel');
broadcast.onmessage = (event) => {
    console.log("service-channel message received: " + event.data); 
    if (event.data == "reload")
    {
        onServiceWorkerReload();
        console.log("service-channel message received: " + event.data);    
    }
};

const serviceWorkerMessage = (msg) => {
    broadcast.postMessage(msg);
}