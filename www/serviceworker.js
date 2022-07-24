const routes = [
    "/pages/404.html",
    "/pages/index.html",
    "/pages/about.html",
    "/img/poc.jpg"
];
const cacheName = 'resources';

const broadcast = new BroadcastChannel('service-channel');

const appMessage = (msg) => {
    broadcast.postMessage(msg);
}

this.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => cache.addAll(routes))
    );
    console.log("installed");
});

this.addEventListener('fetch', event => {
    //console.log("serviceworker: fetch " + event.request.url); 

    event.respondWith(
        (async function() {
            const cache = await caches.open(cacheName);
            const cachedFiles = await cache.match(event.request);
            if (cachedFiles) {
                console.log("serviceworker cache response for " + event.request.url);
                return cachedFiles;
            } else {
                console.log("serviceworker network response for " + event.request.url);
                return fetch(event.request);
            }
        }())
    );      
});

broadcast.onmessage = (event) => {
    console.log("serviceworker message received: " + event.data, event);
}