"use strict";

let listadoArticulos = [];

//Traigo los datos del mosk y los inserto en un arreglo global.
async function cargarArticulos() {
    const URL = "http://localhost:3000/mock/mockArticulos.json"
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

cargarArticulos();
