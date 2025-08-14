// Service Worker for aggressive caching and performance
const CACHE_NAME = 'scandiscent-v1';
const STATIC_CACHE = 'scandiscent-static-v1';
const IMAGES_CACHE = 'scandiscent-images-v1';
const API_CACHE = 'scandiscent-api-v1';

// Cache strategies
const CACHE_FIRST_RESOURCES = [
  '/',
  '/manifest.json',
  '/attached_assets/sverige_1754848613465.png',
  // Fonts from Google Fonts
  'https://fonts.googleapis.com/css2',
  'https://fonts.gstatic.com/'
];

const NETWORK_FIRST_RESOURCES = [
  '/api/',
  '/admin'
];

const STALE_WHILE_REVALIDATE_RESOURCES = [
  '/attached_assets/',
  'https://images.unsplash.com/'
];

// Install event - cache static resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(CACHE_FIRST_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE && 
                cacheName !== IMAGES_CACHE && 
                cacheName !== API_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // API requests - Network first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      networkFirstWithCache(event.request, API_CACHE)
    );
    return;
  }
  
  // Images - Stale while revalidate
  if (url.pathname.includes('/attached_assets/') || 
      url.hostname === 'images.unsplash.com') {
    event.respondWith(
      staleWhileRevalidate(event.request, IMAGES_CACHE)
    );
    return;
  }
  
  // Static resources - Cache first
  if (CACHE_FIRST_RESOURCES.some(resource => 
      url.pathname === resource || url.pathname.startsWith(resource))) {
    event.respondWith(
      cacheFirst(event.request, STATIC_CACHE)
    );
    return;
  }
  
  // Default - Network first
  event.respondWith(
    networkFirstWithCache(event.request, CACHE_NAME)
  );
});

// Cache strategies implementation
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline page or cached fallback
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirstWithCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  
  return cached || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic for forms, etc.
  console.log('Background sync triggered');
}

// Push notification support
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/attached_assets/sverige_1754848613465.png',
      badge: '/attached_assets/sverige_1754848613465.png'
    });
  }
});