const CACHE_NAME = 'classepro-v1.2';
const urlsToCache = [
  'https://classepro.github.io/Classepro/',
  'https://classepro.github.io/Classepro/index.html',
  'https://classepro.github.io/Classepro/menu.html',
  'https://classepro.github.io/Classepro/support.html',
  'https://classepro.github.io/Classepro/style.css',
  'https://classepro.github.io/Classepro/script.js',
  'https://classepro.github.io/Classepro/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'
];

// Installation
self.addEventListener('install', event => {
  console.log('🔄 Service Worker installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => {
        console.log('✅ Cache initialisé:', CACHE_NAME);
        return self.skipWaiting();
      })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker activation...');
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('🗑️ Suppression ancien cache:', name);
            return caches.delete(name);
          }
        })
      )
    ).then(() => {
      console.log('✅ Nouveau Service Worker activé');
      return self.clients.claim();
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne la ressource du cache si disponible
        if (response) {
          return response;
        }
        
        // Sinon, fetch depuis le réseau
        return fetch(event.request).then(response => {
          // Vérifie si la réponse est valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone la réponse pour la mettre en cache
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Communication avec la page pour les mises à jour
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});