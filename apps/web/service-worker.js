const CACHE_NAME = 'pwa-cep-cache-v1';

// Lista de arquivos que queremos salvar em cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Evento 'install': Salva os assets no cache
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Salvando assets no cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Evento 'fetch': Responde com o cache se disponível
self.addEventListener('fetch', (event) => {
  console.log(`[Service Worker] Buscando: ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se tiver no cache, retorna do cache.
      // Senão, busca na rede (estratégia Cache-First)
      return response || fetch(event.request);
    })
  );
});