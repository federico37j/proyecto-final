/* console.log(articulo.nombre + "nombreArticulo"); */
async function mostrarCarrito() {

    try {
        let response = await fetch("/carrito");

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
    if (prod.length==0){
html = `
<div class= "carrito-vacio row border rounded border-info m-1 p-3 justify-content-around">El carrito está vacio</div>
`
    }else{
    for (let i = 0; i < prod.length; i++) {
        r = prod[i];
        suma = suma + parseInt(r.precio);
        html += `
    <div class= "row border rounded border-info m-1 p-3 justify-content-around">
    <div class="col-md-2 rounded-circle bg-white img-container"><img class="imgCarrito" src=${r.imagenes}></div>
    <div class="col-md-5"><b>${r.nombre}</b></div>
    <div class= "conteiner">
    <div class="col-md-2">${formatter.format(r.precio)}</div>
    <div class="col-md-2"> <button class= "btnTachito" pos="${i}"></button> </div>
    </div>

    </div>
    `;


        /*     htmlRes += `
        <tr>
        <td>${r.nombre}</td>
        <td>${r.precio}</td>
        </tr>
        `; */
    }
}
    document.querySelector("#productos").innerHTML = html;

    /* document.querySelector("#resumen").innerHTML = htmlRes; */

    document.querySelector("#suma").innerHTML = "Total " + formatter.format(suma);

    localStorage.setItem("suma", suma);

    let botonesBorrar = document.querySelectorAll(".btnTachito");
    botonesBorrar.forEach(boton => {
        boton.addEventListener("click", btnBorrarClick);
    });
}


if( document.getElementById('suma')!=undefined){

    document.getElementById('suma').innerHTML = suma;
}

/* let btnMock = document.querySelector("#llamarMock");
if (btnMock != undefined) {
    btnMock.addEventListener("click", mostrarCarrito);
} */
mostrarCarrito();

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0,
    //maximumFractionDigits: 0,
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
/* option(0); */

/* let botonVaciarCarrito = document.getElementById('vaciarCarrito');
botonVaciarCarrito.addEventListener("click", vaciarCarrito); */

if(document.getElementById("compraExitosa")!=undefined){
    console.log("entra a funcion compra existosa");
    vaciarCarrito()
}

