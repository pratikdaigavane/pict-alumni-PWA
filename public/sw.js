const staticCacheName = 'site-static4';
const assets1 = [
    '',
    '/index.html',
    '/register.html',
    '/js/feedback.js',
    '/img/paa.png',
];

// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets1);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
});
