/* console.log(articulo.nombre + "nombreArticulo"); */
async function mostrarCarrito() {
    console.log("HIOLAS")
    try {
        let response = await fetch("/carrito");
        if (response.ok) {
            console.log(response)
            let productos = await response.json();
            console.log(productos);
            mostrarProductos(productos);
        }
        else
            container.innerHTML = `<h2>Error al cargar la pagina</h2>`
    }
    catch (response) {
        container.innerHTML = `<h2>${response}</h2>`;
    };
}

let suma=0;

function mostrarProductos(prod) {
    let html = "";
    let htmlRes = "";
    /* let suma = 0; */
    for (let i = 0; i < prod.length; i++) {
        console.log(prod[i])
        r = prod[i];
        suma = suma + parseInt(r.precio);
        html += `
    <div class= "row border rounded border-info m-1 p-3 justify-content-around">
    <div class="col-md-2 rounded-circle bg-white img-container"><img class="imgCarrito" src=${r.imagenes}></div>
    <div class="col-md-5"><b>${r.nombre}</b></div>
    <div class="col-md-2">${formatter.format(r.precio)}</div>

    </div>
    `;


        htmlRes += `
    <tr>
    <td>${r.nombre}</td>
    <td>${r.precio}</td>
    </tr>
    `;
    }

    document.querySelector("#productos").innerHTML = html;

    /* document.querySelector("#resumen").innerHTML = htmlRes; */

    document.querySelector("#suma").innerHTML = "Total " + formatter.format(suma);

    localStorage.setItem("suma",suma);

}

console.log(localStorage.getItem("suma"));

let objetivo = document.getElementById('suma');
objetivo.innerHTML = suma;

let btnMock = document.querySelector("#llamarMock");
btnMock.addEventListener("click", mostrarCarrito);

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

option(0);


