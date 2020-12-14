/* const { json } = require("express");
 */
/* console.log(articulo.nombre + "nombreArticulo"); */
let productos;
async function mostrarCarrito() {

    try {
        let response = await fetch("/carrito");
        productos = [];
        if (response.ok) {

            let productos = await response.json();
            mostrarProductos(productos);
        }
        else
            document.getElementsByClassName("container").innerHTML = `<h2>Error al cargar la pagina</h2>`
    }
    catch (response) {
        document.getElementsByClassName("container").innerHTML = `<h2>${response}</h2>`;
    };
}

let suma = 0;

function mostrarProductos(prod) {
    let html = "";
    let htmlRes = "";
    suma = 0;
    let botonEnviar = document.getElementById('btn-siguiente');
    if (prod.length == 0) {
        botonEnviar.disabled = true
        html = `
<div class= "carrito-vacio row border rounded border-info m-1 p-3 justify-content-around">El carrito está vacio</div>
`
    } else {
        botonEnviar.disabled = false
        for (let i = 0; i < prod.length; i++) {
            r = prod[i];
            suma = suma + parseInt(r.precio * r.cantidad);
            html += `
    <div class= "row border rounded border-info m-1 p-3 justify-content-around">
    <div class="col-md-2 rounded-circle bg-white img-container"><img class="imgCarrito" src=${r.imagenes}></div>
    <div class="col-md-5"><b>${r.nombre}</b></div>

    <div class= "col-md-3">
    <div class="row"><h4><b>${formatter.format(r.precio * r.cantidad)}</b></h4></div>
    <div class="row"><b>${r.cantidad}</b>     X ${formatter.format(r.precio)}</div>
    <div class="row"><button class="subirCantidad" id="aumentar" pos="${i}"></button><button class="bajarCantidad" id="disminuir" pos="${i}" cantidad="${r.cantidad}"></button><button class= "btnTachito" pos="${i}"></div>
    </div>
    </div>

    </div>
    `;
        }
    }
    document.querySelector("#productos").innerHTML = html;

    /* document.querySelector("#resumen").innerHTML = htmlRes; */

    document.querySelector("#suma").innerHTML = "Total " + formatter.format(suma);

    localStorage.setItem("suma", suma);


    

    let botonesDisminuir = document.querySelectorAll(".bajarCantidad");
    botonesDisminuir.forEach(boton => {
        boton.addEventListener("click", disminuirCantidad);
    });



    let botonesAumentar = document.querySelectorAll(".subirCantidad");
    botonesAumentar.forEach(boton => {
        boton.addEventListener("click", sumarCantidad);
    });
    let botonesBorrar = document.querySelectorAll(".btnTachito");
    botonesBorrar.forEach(boton => {
        boton.addEventListener("click", btnBorrarClick);
    });
}


if (document.getElementById('suma') != undefined) {

    document.getElementById('suma').innerHTML = suma;
}

mostrarCarrito();

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

});

function mostrarDiv(x) {
    if (x === 0) {
        document.getElementById('divSuc').style.display = 'none';
        document.getElementById('btnsRetiroSuc').style.display = 'none';
        document.getElementById('divForm').style.display = 'contents';

    } else {
        document.getElementById('divForm').style.display = 'none';
        document.getElementById('btnsRetiroSuc').style.display = 'contents';
        document.getElementById('divSuc').style.display = 'contents';
    }
    return;
}

async function btnBorrarClick() {
    let pos = this.getAttribute("pos");
    let response = await fetch(`/carrito/${pos}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    mostrarCarrito();
}

async function vaciarCarrito() {

    let response = await fetch(`/carrito`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

}


function siguientePantalla() {
    window.location = "http://localhost:3000/html/carrito1.html";
}

if (document.getElementById('btn-siguiente') != undefined) {
    let botonSiguiente = document.getElementById('btn-siguiente');
    botonSiguiente.addEventListener("click", siguientePantalla);
}

if (document.getElementById("compraExitosa") != undefined) {
    obtenerCarrito();
    vaciarCarrito();
}


function disminuirCantidad() {
    let pos = this.getAttribute("pos");
    let cantidad = this.getAttribute("cantidad");
    if(cantidad > 1){
        let valor = "restar";
        actualizarCantidad(valor, pos);
    }
}

function sumarCantidad() {
    let pos = this.getAttribute("pos");
    console.log("ingresa actualizar cantidad")
    let valor = "sumar";
    actualizarCantidad(valor, pos);
}

async function actualizarCantidad(operacion, pos) {

    console.log("ingresa actualizar cantidad");
    let valor = {
        "operacion": operacion
    };
    
    let response = await fetch(`/carrito/${pos}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(valor)
    })
    if (response) {
        mostrarCarrito();
    }
    //   mostrarCarrito();
}

async function crearFactura(productos) {
    let date = new Date();
    let factura = {
        "productos": productos,
        "suma": localStorage.getItem("suma"),
        "fecha": date,
        "idUsuario": window.sessionStorage.getItem("idUser"),
        "idLocal": 1

    }
    let respuesta = await fetch("http://localhost:3000/factura", {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(factura)
    });
    if (respuesta.ok) {
        let factura = await respuesta.json();
        loadFactura(Number(factura.idFactura));

    } else {
        console.log("error");
    }
}

async function obtenerCarrito() {

    try {
        let response = await fetch("/carrito");
        productos = [];
        if (response.ok) {

            let productos = await response.json();
            console.log("todos los productos json " + productos);
            crearFactura(productos);
        }
        else
            document.getElementsByClassName("container").innerHTML = `<h2>Error al cargar la pagina</h2>`
    }
    catch (response) {
        document.getElementsByClassName("container").innerHTML = `<h2>${response}</h2>`;
    };
}
if (document.querySelector('#btn_factura') != undefined) {
    document.querySelector('#btn_factura').addEventListener('click', function () {
        document.querySelector('.contenedor-resultado-compra').classList.toggle('ocultar');
        document.querySelector('.factura').classList.toggle('ocultar');
        document.querySelector('.contenedor-btn-imprimir').classList.toggle('ocultar');
    })
}

if (document.querySelector('#btn_imprimir') != undefined) {
    document.querySelector('#btn_imprimir').addEventListener('click', function () {
        window.print();
    })
}