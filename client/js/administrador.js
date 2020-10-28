'use strict';


let botonesBorrar = document.querySelectorAll(".btn-delete-articulo");
botonesBorrar.forEach(e => {
    e.addEventListener("click", btnBorrarClick);
});


let botonesActualizar = document.querySelectorAll(".btn-update-articulo");
botonesActualizar.forEach(e => {
    e.addEventListener("click", btnActualizarClick);
});

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
    if(listaArticulos.length > 10) {
        cargarHTML();
    }
}

function cargarHTML() {
    let divTabla = document.querySelector('#tabla');
    let table = document.createElement('Table')
    table.className = 'content-table';
    let thead = document.createElement('thead')
    let titulos = document.createElement('tr');
    thead.id = 'encabezado';
    let cuerpoTabla = document.createElement('tbody');
    cuerpoTabla.id = 'datos-tabla';
    divTabla.appendChild(table);
    table.appendChild(thead);
    titulos.innerHTML = "<th>STOCK</th>" + "<th>NOMBRE</th>" + "<th>PRECIO</th>" + "<th>FINANCIACIÓN</th>" +
        "<th>DETALLE</th>" + "<th>TIPO</th>" + "<th>IMAGENES</th>" + "<th>ELIMINAR</th>" + "<th>ACTUALIZAR</th>";
    thead.appendChild(titulos);

    table.appendChild(cuerpoTabla);
    let html = "";
    for (let i = 0; i < listaArticulos.length; i++) {
        html += `
        <tr>
        <th><input type="text" value=${listaArticulos[i].stock} id="stock${i}"></th>
        <td><input type="text" value=${listaArticulos[i].nombre} id="nombre${i}"></td>
        <td><input type="text" value=${listaArticulos[i].precio} id="precio${i}"></td>
        <td><input type="text" value=${listaArticulos[i].financiacion} id="financiacion${i}"></td>
        <td><input type="text" value=${listaArticulos[i].detalle} id="detalle${i}"></td>
        <td><input type="text" value=${listaArticulos[i].tipo} id="tipo${i}"></td>
        <td><input type="text" value="${listaArticulos[i].imagenes}" id="imagenes${i}"></td>
        <td><button class="btn-delete-articulo" pos=${i}><ion-icon name="close-circle-outline"></ion-icon></button></td>
        <td><button class="btn-update-articulo" pos=${i}><ion-icon name="sync-circle-outline"></ion-icon></button></td>
        </tr>
        `
    }
    document.querySelector("#datos-tabla").innerHTML = html;
}

async function btnBorrarClick() {
    let pos = this.getAttribute("pos");
    let response = await fetch(`/articulo/${pos}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        console.log(`Elemento borrado ${pos}`);
        load();
    } else {
        console.log("No se pudo borrar");
    }
}

async function btnActualizarClick() {
    let pos = this.getAttribute("pos");
    let renglon = {
        "nombreProducto": document.getElementById(`prod${pos}`).value,
        "precio": document.getElementById(`prec${pos}`).value
    };
    
    let response = await fetch(`/articulo/${pos}`, {
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