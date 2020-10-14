"use strict";

let btnEliminar = document.querySelector("#btn-eliminar");

//Al hacer click en el botón le agrego la clase ocultar al div envios
btnEliminar.addEventListener("click", function () {
    document.querySelector("#div-envios").classList.toggle("ocultar");
});