const routes = [
    "/pages/404.html",
    "/pages/index.html",
    "/pages/about.html",
    "/img/poc.jpg"
];

const broadcast = new BroadcastChannel('service-channel');

const log = (msg) => {
    console.log("sw: " + msg);
    broadcast.postMessage(msg);
}

this.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open('resources')
            .then(cache => cache.addAll(routes))
    );
    log("installed");
});

this.addEventListener('fetch', event => {
    log("fetch");
    const match = caches.match(event.request);
    if (match)
    {
        log("cached response for " + event.request);
        event.respondWith(match);    
    }
    else
    {
        log("no match for " + event.request);
    }
});


broadcast.onmessage = (event) => {
    log("message(bc) received: " + event.data);
}