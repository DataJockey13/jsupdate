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

self.onfetch = (event) => {
    log("fetch"); 
}

this.addEventListener('fetch', event => {
    log("fetch");
    event.respondWith(caches.match(event.request));    
});

broadcast.onmessage = (event) => {
    console.log("serviceworker message received: " + event.data);
}