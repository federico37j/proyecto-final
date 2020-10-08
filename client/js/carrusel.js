"use strict";


let imagenes = new Array(
    'img/banner.jpg',
    'img/banner1.jpg',
    'img/banner2.jpg'
);

function obtenerIndexAleatorio() {
    return Math.floor(Math.random() * imagenes.length);
}

function mostrarBannerAleatorio() {
    let index =  obtenerIndexAleatorio();
    document.querySelector('#img-banner').src = imagenes[index];
}

onload = function () {
    mostrarBannerAleatorio();
    setInterval(mostrarBannerAleatorio, 4000);
}