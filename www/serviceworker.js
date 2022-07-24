const routes = [
    "/pages/404.html",
    "/pages/index.html",
    "/pages/about.html",
    "/img/poc.jpg"
];

const broadcast = new BroadcastChannel('service-channel');

const appMessage = (msg) => {
    broadcast.postMessage(msg);
}

this.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open('resources')
            .then(cache => cache.addAll(routes))
    );
    console.log("installed");
});

this.addEventListener('fetch', event => {
    console.log("serviceworker: fetch", event.request);    
    event.respondWith(caches.match(event.request));    
});

broadcast.onmessage = (event) => {
    console.log("serviceworker message received: " + event.data, event);
}