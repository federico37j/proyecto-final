"use strict";

//Se crea un arreglo con la ruta de cada imagen.
let imagenes = new Array(
    'img/banner.jpg',
    'img/banner1.jpg',
    'img/banner2.jpg',
    'img/banner3.jpg'
);

//Se obtiene un número aleatorio entre 0 y la cantidad de imágenes en el arreglo.
function obtenerIndexAleatorio() {
    return Math.floor(Math.random() * imagenes.length);
}

//Dependiendo del número devuelto por la función obtenerIndexAleatorio() es el índex de la imagen que se va a mostrar.
function mostrarBannerAleatorio() {
    let index =  obtenerIndexAleatorio();
    document.querySelector('#img-banner').src = imagenes[index];
}

//llama a la función mostrarBannerAleatorio() cada 4s.
function cargarBanner() {
    mostrarBannerAleatorio();
    setInterval(mostrarBannerAleatorio, 4000);
}

cargarBanner();