"use strict";

let listadoArticulos = [];

//Traigo los datos del mosk y los inserto en un arreglo global.
async function cargarArticulos() {
    const URL = "http://localhost:3000/mosk/moskArticulos.json"
    try {
        let response = await fetch(URL);
        if (response.ok) {
            listadoArticulos = await response.json();
            pasarArreglo(listadoArticulos);
        }

    } catch (response) {
        console.log("Error en la conexión", response);
    }

}

//Paso el listado de artículos dependiendo de cada categoría.
function pasarArreglo(listadoArticulos) {
    cargarCategoria(listadoArticulos.tecnologia, "tecnologia");
    cargarCategoria(listadoArticulos.electrodomesticos, "electrodomesticos");
    cargarCategoria(listadoArticulos.deportes, "deportes");
}


function cargarCategoria(jsonConArticulos, categoria) {
    for (let i = 0; i < jsonConArticulos.length; i++) {
        mostrarDatosHtml(i, jsonConArticulos[i].nombre, "nombre", categoria);
        mostrarDatosHtml(i, jsonConArticulos[i].imagen, "img", categoria, true);
        mostrarDatosHtml(i, jsonConArticulos[i].precio, "precio", categoria);
        mostrarDatosHtml(i, jsonConArticulos[i].financiacion, "financiacion", categoria);
    }
}

// Inserto los valores en cada elemento del html.
function mostrarDatosHtml(indice, valor, tipo, categoria, esImagen = undefined) {
    if (!esImagen) {
        let articulo = document.querySelectorAll(`.articulo .${tipo}-articulo-${categoria}`);
        articulo[indice].textContent = valor;
    } else {
        let articulo = document.querySelectorAll(`.articulo .${tipo}-articulo-${categoria}`);
        articulo[indice].src = valor;
        articulo[indice].alt = valor;
    }
}

cargarArticulos();
