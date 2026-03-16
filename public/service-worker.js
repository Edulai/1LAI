self.addEventListener("install", event => {

console.log("1LAI instalado")

})

self.addEventListener("fetch", event => {

event.respondWith(fetch(event.request))

})