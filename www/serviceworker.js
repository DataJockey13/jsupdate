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
    console.log("serviceworker caching files");
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => cache.addAll(routes))
    );
    self.skipWaiting();    
});

self.addEventListener('activate', (event) =>  {
    console.log('serviceworker claiming control');
    return self.clients.claim();
});

this.addEventListener('fetch', event => { 
    const url = event.request.url || "";
    if (url.endsWith("/version.info"))
    {
        event.respondWith((async () => await fetch(event.request))());
    }
    else
    {
        event.respondWith(
            (async function() 
            {
                const cache = await caches.open(cacheName);
                const cachedFiles = await cache.match(event.request);
                if (cachedFiles) {
                    console.log("serviceworker cache response for " + url);
                    return cachedFiles;
                } else {
                    try {
                        const response = await fetch(event.request);
                        await cache.put(event.request, response.clone());
                        console.log("serviceworker network response for " + url);
                        return response;
                    } catch(e) { console.log(e.msg) }
                }
            }())
        );
    }
});

broadcast.onmessage = (event) => {
    if (event.data == "reload")
    {
        self.caches.delete(cacheName);
        appMessage("reload");
    }
    if (event.data == "clear")
    {
        self.caches.delete(cacheName);
    }
    console.log("serviceworker message received: " + event.data, event);
}