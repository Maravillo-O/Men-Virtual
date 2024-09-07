self.addEventListener("install", event => {
    console.log("service worker instalado");
});

self.addEventListener("activate", event => {
    console .log("service worker activado");
});

self.addEventListener("fetch", evento => {
    console.log("fetch event", evento);
});