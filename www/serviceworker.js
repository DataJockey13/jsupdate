importScripts("globals.js");

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

//this.addEventListener('install', event => {
//    console.log("serviceworker caching files");
//    event.waitUntil(
//        caches
//            .open(cacheName)
//            .then(cache => cache.addAll(routes))
//    );
//    self.skipWaiting();    
//});

self.addEventListener('activate', (event) =>  {
    console.log('serviceworker claiming control');
    return self.clients.claim();
});

this.addEventListener('fetch', event => { 
    const isUpdateAvailable = async () => {
        const version = await fetch(versionFile, {cache: "no-cache"})
            .then((data) => data.text())
            .catch((error) => {
                console.log(error);
            });   
    
        if (version != currentVersion)
        {
            appMessage("update " + version + " available");
        }
    }       
    event.respondWith(
            (async function() {
            const cache = await caches.open(cacheName);
            const cachedFiles = await cache.match(event.request);
            if(cachedFiles) {
                console.log("serviceworker cache response for " + event.request.url);
                return cachedFiles;
            } else {
                try {
                    const response = await fetch(event.request);
                    await cache.put(event.request, response.clone());
                    console.log("serviceworker network response for " + event.request.url);
                    return response;
                } catch(e) { console.log(e.msg) }
            }
        }())
    );
});

broadcast.onmessage = (event) => {
    console.log("serviceworker message received: " + event.data, event);
}