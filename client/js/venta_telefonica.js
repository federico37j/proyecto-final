"use strict";

document.querySelector('#btn-salir').addEventListener('click', function () {
    document.querySelector('.contenido-venta').classList.toggle('activo');
});

document.querySelector('#venta-tel').addEventListener('click', function () {
    document.querySelector('.contenido-venta').classList.toggle('activo');
});