'use strict';

// Arreglo global de articulos.
let listaArticulos = [];

// Traigo los articulos del Back End y los inserto en arreglo global.
async function cargarDatos(categoria) {
    const URL = `/articulo/${categoria}`;
    try {
        let response = await fetch(URL);
        if (response.ok) {
            let articulos = await response.json();
            cargarArregloConArticulos(articulos);
        }
    } catch (response) {
        console.log("Error en la conexión", response);
    }
}

function cargarArregloConArticulos(articulos) {
    for (let i = 0; i < articulos.length; i++) {
        listaArticulos.push(articulos[i]);
    }
    cargarHTML();
}

function cargarHTML() {
    let html = "";
    for (let i = 0; i < listaArticulos.length; i++) {
        html += `
        <tr>
        <th><input type="text" value="${listaArticulos[i].stock}" id="stock${i}"></th>
        <td><input type="text" value="${listaArticulos[i].nombre}" id="nombre${i}"></td>
        <td><input type="text" value="${listaArticulos[i].precio}" id="precio${i}"></td>
        <td><input type="text" value="${listaArticulos[i].financiacion}" id="financiacion${i}"></td>
        <td><input type="text" value="${listaArticulos[i].detalle}" id="detalle${i}"></input></td>
        <td><input type="text" value="${listaArticulos[i].tipo}" id="tipo${i}"></td>
        <td><input type="text" value="${listaArticulos[i].imagenes[0]}" id="imagenes${i}"></td>
        <td><button class="btn-delete-articulo" pos="${i}"><ion-icon name="close-circle-outline"></ion-icon></button></td>
        <td><button class="btn-update-articulo" pos="${i}"><ion-icon name="sync-circle-outline"></ion-icon></button></td>
        </tr>
        `
    }

    document.querySelector("#tabla").innerHTML = html;
    comportamientoBtn(".btn-delete-articulo", btnBorrarClick);
    comportamientoBtn(".btn-update-articulo", btnActualizarClick);
}

function comportamientoBtn(btnClass, fn) {
    let botones = document.querySelectorAll(btnClass);
    botones.forEach(boton => {
        boton.addEventListener("click", fn);
    });
}

async function btnBorrarClick() {
    console.log("borrar")
    let pos = this.getAttribute("pos");
    let response = await fetch(`/stock/${pos}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        console.log(`Elemento borrado ${pos}`);
        cargarDatos();
    } else {
        console.log("No se pudo borrar");
    }
}

async function btnActualizarClick() {
    console.log("Actualizar")
    let pos = this.getAttribute("pos");
    let renglon = {
        "stock": document.getElementById(`stock${pos}`).value,
        "nombre": document.getElementById(`nombre${pos}`).value,
        "precio": document.getElementById(`precio${pos}`).value,
        "financiacion": document.getElementById(`financiacion${pos}`).value,
        "detalle": document.getElementById(`detalle${pos}`).value,
        "tipo": document.getElementById(`tipo${pos}`).value,
        "imagenes": document.getElementById(`imagenes${pos}`).value
    }
    
    let response = await fetch(`/stock/${pos}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(renglon)
    });

    if (response.ok) {
        console.log("Actualizado");
    } else {
        console.log("Error");
    }
}

cargarDatos("deportes");
cargarDatos("electrodomesticos");
cargarDatos("tecnologia");