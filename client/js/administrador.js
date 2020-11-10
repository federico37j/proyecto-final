'use strict';

let tbody_detalle_tabla = document.querySelector("#detalle-tabla");

// Arreglo global de articulos.
let listaArticulos = [];
let secureUrlImg = [];

/* //////////////
   Cargar tabla
//////////////*/

document.querySelectorAll('.dropdown-item').forEach(categoria => {
    categoria.addEventListener('click', function () {
        cargarDatos(categoria.id);
    });
});

// Traigo los articulos del Back End y los inserto en arreglo global.
async function cargarDatos(categoria) {
    let mensaje = document.querySelector('#mensaje');
    const URL = `/stock/${categoria}`;
    try {
        let response = await fetch(URL);
        if (response.ok) {
            let articulos = await response.json();
            cargarArregloConArticulos(articulos, categoria);
        } else {
            tbody_detalle_tabla.innerHTML = '';
            mensaje.innerHTML = "No hay registros cargados para esa categoría."
        }

    } catch (response) {
        console.log("Error en la conexión", response);
    }

}

function cargarArregloConArticulos(articulos, categoria) {
    listaArticulos = [];
    for (let i = 0; i < articulos.length; i++) {
        listaArticulos.push(articulos[i]);
    }
    cargarHTML(categoria);
}

function cargarHTML(categoria) {
    let html = "";
    for (let i = 0; i < listaArticulos.length; i++) {
        html += `
        <tr>
        <th><input class="text-center" type="text" value="${listaArticulos[i].stock}" id="stock${i}"></th>
        <td><input type="text" value="${listaArticulos[i].nombre}" id="nombre${i}"></td>
        <td><input class="text-center" type="text" value="${listaArticulos[i].precio}" id="precio${i}"></td>
        <td><input class="text-center" type="text" value="${listaArticulos[i].financiacion}" id="financiacion${i}"></td>
        <td><input type="text" value="${listaArticulos[i].detalle}" id="detalle${i}"></input></td>
        <td><input type="text" value="${listaArticulos[i].tipo}" id="tipo${i}"></td>
        <td style="display: flex;align-items: center;"><img src="${listaArticulos[i].imagenes[0]}" alt=""><img src="${listaArticulos[i].imagenes[1]}" alt=""><img src="${listaArticulos[i].imagenes[2]}" alt=""><img src="${listaArticulos[i].imagenes[3]}" alt=""></td>
        <td><button class="btn-delete-articulo" pos="${i}" data-categoria="${categoria}"><ion-icon name="close-circle-outline"></ion-icon></button></td>
        <td><button class="btn-update-articulo" pos="${i}" data-categoria="${categoria}"><ion-icon name="sync-circle-outline"></ion-icon></button></td>
        </tr>
        `
    }
    mensaje.innerHTML = '';
    tbody_detalle_tabla.innerHTML = html;
    comportamientoBtn(".btn-delete-articulo", btnBorrarClick);
    comportamientoBtn(".btn-update-articulo", btnActualizarClick);
}

// function pasarArrayImgCadena(arrImg) {
//     <td><input type="text" value="${pasarArrayImgCadena(listaArticulos[i].imagenes)}" id="imagenes${i}"></td>
//     let cadenaUrl = "";
//     for (let i = 0; i < arrImg.length; i++) {
//         cadenaUrl += arrImg[i] + "|";
//     }
//     return cadenaUrl;
// }

function pasarCadenaUrlArregloImg(pos) {
    let cadenaUrl = document.getElementById(`imagenes${pos}`).value
    let lineas = cadenaUrl.split('|');
    //Le quito la ultima posición
    lineas.pop();
    return lineas;
}

/* //////////////
  Botones 
//////////////*/

function comportamientoBtn(btnClass, fn) {
    let botones = document.querySelectorAll(btnClass);
    botones.forEach(boton => {
        boton.addEventListener("click", fn);
    });
}

async function btnBorrarClick() {
    console.log("borrar")
    let data_categoria = this.dataset.categoria;
    let pos = this.getAttribute("pos");
    let response = await fetch(`/stock/${data_categoria}/${pos}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        cargarDatos(data_categoria);
    } else {
        console.log("No se pudo borrar");
    }
}

async function btnActualizarClick() {
    let pos = this.getAttribute("pos");
    let data_categoria = this.dataset.categoria;
    let renglon = {
        "nombre": document.getElementById(`nombre${pos}`).value,
        "precio": document.getElementById(`precio${pos}`).value,
        "financiacion": document.getElementById(`financiacion${pos}`).value,
        "detalle": document.getElementById(`detalle${pos}`).value,
        "tipo": document.getElementById(`tipo${pos}`).value,
        "stock": document.getElementById(`stock${pos}`).value,
        "imagenes": pasarCadenaUrlArregloImg(pos)
    }
    let response = await fetch(`/stock/${data_categoria}/${pos}`, {
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

document.querySelector('#btn-salir').addEventListener('click', function () {
    document.querySelector('.contenedor-cargar-articulo').classList.toggle('activo');
});

document.querySelector('#btn_cargar_articulo').addEventListener('click', function () {
    document.querySelector('.contenedor-cargar-articulo').classList.toggle('activo');
});

/* //////////////
   Pop up cargar articulo
//////////////*/

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dpqkhmplb/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = `eg5p23er`;

async function showPreview(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        const archivo = event.target.files[0];
        const formData = new FormData();
        formData.append('file', archivo);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const res = await axios.post(CLOUDINARY_URL, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress (e) {
                    let progress = Math.round((e.loaded * 100) / e.total);
                    document.getElementById(`${event.target.id}-bar`).setAttribute('value', progress);
                }
            });
        var preview = document.getElementById(`${event.target.id}-preview`);
        preview.src = src;
        preview.style.display = "block";
        secureUrlImg.push(res.data.secure_url);
    }
}

document.querySelector('.btn-agregar-articulo').addEventListener('click', async function () {
    let categoria = document.getElementById(`categoria`).value
    let articulo = {
        "nombre": document.getElementById(`nombre`).value,
        "precio": document.getElementById(`precio`).value,
        "financiacion": document.getElementById(`financiacion`).value,
        "detalle": document.getElementById(`detalle`).value,
        "tipo": document.getElementById(`tipo`).value,
        "stock": document.getElementById(`stock`).value,
        "imagenes": secureUrlImg
    }

    let respuesta = await fetch(`http://localhost:3000/stock/${categoria}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(articulo)
    });
    if (respuesta.ok) {
        listaArticulos.push(articulo);
    } else {
        console.log('Hubo un error');
    }
});
