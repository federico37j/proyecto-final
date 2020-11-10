"use strict";

// NodeList con imágenes secundarias.
let listadoImagenes = document.querySelectorAll(".img-detalle-articulo .img-secundarias .img");
// Imagen principal de detalle producto
let imagenPrincipal = document.querySelector("#img-principal");

/**
 * 
 * Carga de detalle del producto.
 * 
 **/
// Traigo el artículo según la url.
async function load() {
    try {
        let params = processParams();
        const URL = `/stock/${params["categoria"]}/${params["index"]}`;
        let response = await fetch(URL);
        if (response.ok) {
            let articulo = await response.json();
            imagenPrincipal.src = articulo.imagenes[0];

            for (let i = 0; i < articulo.imagenes.length; i++) {
                cargarImagenes(i, articulo.imagenes[i]);
            }
            document.querySelector("#nombre-articulo").textContent = articulo.nombre;
            document.querySelector("#precio-articulo").textContent = `$${articulo.precio}`;
            document.querySelector("#financiacion-articulo").textContent = articulo.financiacion;
            document.querySelector("#descripcion-articulo").textContent = articulo.detalle;

        } else {
            console.log("Error - Failed URL!");
        }
    }
    catch (response) {
        console.log("Connection error", response);
    }
}

// Inserto el src a cada imagen segundaria.
function cargarImagenes(i, imagen) {
    if (imagen != null) {
        listadoImagenes[i].src = imagen;
    } else {
        listadoImagenes[i].src = '';
    }
}

/**
 * 
 * Carga de las secciones (Recomendados - Quienes vieron este producto también compraron).
 * 
 **/
// Traigo los artículos según la categoría.
async function cargarArticulos(categoria) {
    const URL = `/stock/${categoria}`;
    try {
        let response = await fetch(URL);
        if (response.ok) {
            let listadoArticulos = await response.json();
            cargarCategoria(listadoArticulos, categoria);
        }

    } catch (response) {
        console.log("Error en la conexión", response);
    }
}

/**
 * 
 * Carga según el click la imagen principal.
 * 
 **/
//comparo el src de la imagen con el href de la página si no es igual permito que cambie la imagen.
listadoImagenes.forEach(img => {
    img.addEventListener('click', function (e) {
        e.preventDefault();
        if (img.src != window.location.href) {
            imagenPrincipal.src = img.src
        }
    });
});

cargarArticulos("tecnologia");
cargarArticulos("electrodomesticos");
load();

// agrego el login si el usuario decide comprar un articulo
let btnCompra = document.querySelector(".btn-comprar");
btnCompra.addEventListener("click",redireccionar);

function redireccionar(){
    window.location="http://localhost:3000/html/registerUsr.html";
  }