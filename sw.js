const CACHE_ESTATICO = "ruta-segura-static-v3";
const CACHE_DINAMICO = "ruta-segura-dynamic-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/datos.js",
  "./js/ui.js",
  "./js/app.js",
  "./img/icon.svg",
];
self.addEventListener("install", (event) => {
  event.waitUntil(instalarServiceWorker());
});
self.addEventListener("activate", (event) => {
  event.waitUntil(activarServiceWorker());
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(estrategiaNetworkFirst(event.request));
});
async function instalarServiceWorker() {
  const cache = await caches.open(CACHE_ESTATICO);
  await cache.addAll(APP_SHELL);
  await self.skipWaiting();
}
async function activarServiceWorker() {
  const nombresCache = await caches.keys();
  await Promise.all(
    nombresCache
      .filter(
        (nombre) => nombre !== CACHE_ESTATICO && nombre !== CACHE_DINAMICO,
      )
      .map((nombre) => caches.delete(nombre)),
  );
  await self.clients.claim();
}

async function estrategiaNetworkFirst(request) {
  const cacheDinamico = await caches.open(CACHE_DINAMICO);

  try {
    const respuestaRed = await fetch(request);
    if (respuestaRed && respuestaRed.ok) {
      await cacheDinamico.put(request, respuestaRed.clone());
    }
    return respuestaRed;
  } catch {
    const respuestaCacheDinamico = await cacheDinamico.match(request);
    if (respuestaCacheDinamico) {
      return respuestaCacheDinamico;
    }

    const respuestaCacheEstatico = await caches.match(request);
    if (respuestaCacheEstatico) {
      return respuestaCacheEstatico;
    }

    return manejarRecursoNoDisponible(request);
  }
}


/*async function estrategiaCacheFirst(request) {
  const respuestaCache = await caches.match(request);

  if (respuestaCache) {
    return respuestaCache;
  }

  try {
    const respuestaRed = await fetch(request);

    if (respuestaRed.ok) {
      const cache = await caches.open(CACHE_ESTATICO);
      await cache.put(request, respuestaRed.clone());
    }

    return respuestaRed;
  } catch {
    return manejarRecursoNoDisponible(request);
  }
}*/

async function manejarRecursoNoDisponible(request) {
  if (request.mode === "navigate") {
    const paginaOffline = await caches.match("./offline.html");
    if (paginaOffline) {
      return paginaOffline;
    }
  }
  if (request.destination === "image") {
    const imagenAlternativa = await caches.match("./img/icon.svg");
    if (imagenAlternativa) {
      return imagenAlternativa;
    }
  }
  return new Response("Recurso no disponible en la red ni en la caché.", {
    status: 504,
    statusText: "Recurso no disponible",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}