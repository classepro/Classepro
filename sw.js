const CACHE_NAME = 'classepro-v1.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/menu.html',
  '/support.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'
];

// Installation du Service Worker
self.addEventListener('install', function(event) {
  console.log('🔄 Service Worker en cours d\'installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('✅ Cache ouvert:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('✅ Toutes les ressources ont été mises en cache');
        return self.skipWaiting(); // Force l'activation immédiate
      })
      .catch(function(error) {
        console.error('❌ Erreur lors de la mise en cache:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', function(event) {
  console.log('🔄 Service Worker en cours d\'activation...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('✅ Nouveau Service Worker activé:', CACHE_NAME);
      return self.clients.claim(); // Prend le contrôle immédiat de toutes les pages
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Retourne la réponse en cache ou fetch la requête
        if (response) {
          console.log('📦 Ressource servie depuis le cache:', event.request.url);
          return response;
        }
        
        console.log('🌐 Ressource fetch depuis le réseau:', event.request.url);
        return fetch(event.request)
          .then(function(response) {
            // Vérifie si la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone la réponse pour la mettre en cache
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
                console.log('💾 Nouvelle ressource mise en cache:', event.request.url);
              });

            return response;
          })
          .catch(function(error) {
            console.error('❌ Erreur fetch:', error);
            // Vous pouvez retourner une page d'erreur personnalisée ici
          });
      })
  );
});