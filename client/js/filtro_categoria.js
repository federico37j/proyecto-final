//Se inicializa según especifica la librería.
const grid = new Muuri(".grid-contendedor-cards", {
    layout: {
        rounding: false
    }
});

//Actualiza posicionamiento de los elementos según librería.
function actualizarPagina() {
    grid.refreshItems().layout();
}

//Cargan todas las imágenes iguales.
function cargarImagenes() {
    let gridPrincipal = document.querySelector("#grid-principal");
    gridPrincipal.classList.toggle("cargar-imagenes");
}

//Agrego el listener a la barra de busqueda
document.querySelector("#barra-busqueda").addEventListener('input', e => {
    //Cuando el usuario escriba en el input se ejecuta el código.
    let busqueda = e.target.value;
    grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda.toLowerCase()));
});

// Traigo el elemento al que le hice click para agregarle la clase activo y remuevo el activo de los otros.
function seleccionarEnlaces() {
    let categoriasFiltrado = document.querySelectorAll("#categorias-filtrado a");
    categoriasFiltrado.forEach(categoria => {
        categoria.addEventListener("click", elemento => {
            elemento.preventDefault();
            document.querySelector(".grid-contenedor-pricipal .categorias-filtrado a.activo").classList.remove("activo");
            elemento.target.classList.add("activo");
            // Comparo el filtro seleccionado con la data-categoria del elemento.
            let categoria = elemento.target.textContent.toLowerCase();
            //Si son dos palabras le quito los espacios.
            filtarSegunCategoria(categoria.replace(/ /g, ""));
        });
    });
}

function filtarSegunCategoria(categoria) {
    if (categoria === "quitarfiltro") {
        grid.filter("[data-categoria]");
    } else {
        grid.filter(`[data-categoria=${categoria}]`);
    }
}

// Traigo los artículos según la categoría.
async function cargarArticulos() {
    let params = processParams();
    const URL = `/stock/${params["categoria"]}`;
    try {
        let response = await fetch(URL);
        if (response.ok) {
            let listadoArticulos = await response.json();
            let valorCategoria = params["categoria"];
            cargarCard(valorCategoria);
            cargarCategoria(listadoArticulos, valorCategoria);
            asignarFiltros(valorCategoria);
            modificarDataSet(listadoArticulos);
        }

    } catch (response) {
        console.log("Error en la conexión", response);
    }
}

// Le agrego los nombres a los filtros que se visualizan a la izquierda de la pantalla.
function asignarFiltros(categoria) {
    let listaSubcategorias = document.querySelectorAll(`#${categoria} p`);
    let listaBtnfiltrado = document.querySelectorAll(".grid-contenedor-pricipal .categorias-filtrado a");
    for (let i = 0; i < listaSubcategorias.length; i++) {
        listaBtnfiltrado[i + 1].textContent = listaSubcategorias[i].textContent;
    }
}

function cargarCard(categoria) {
    let cantidadArticulos = document.querySelectorAll(".item").length;
    for (let i = 0; i < cantidadArticulos; i++) {
        cargarCategoriaHtml(i, categoria);
    }
}

// Le agrego a cada elemento del HTMl la clase con la categoría correspondiente.
function cargarCategoriaHtml(i, categoria) {
    document.querySelectorAll(".contenedor-cards-articulos .articulo a")[i].className = `button-articulo-${categoria}`;
    document.querySelectorAll(".contenedor-cards-articulos .articulo img")[i].className = `img-articulo-${categoria}`;
    document.querySelectorAll(".contenedor-cards-articulos .articulo label")[i].className = `nombre-articulo-${categoria}`;
    document.querySelectorAll(".contenedor-cards-articulos .articulo p")[i].className = `precio-articulo-${categoria}`;
    document.querySelectorAll(".contenedor-cards-articulos .articulo h2")[i].className = `financiacion-articulo-${categoria}`;
}

// A la data-etiquetas le pongo el nombre del producto y a la data-categoria le pongo el tipo.
function modificarDataSet(articulo) {
    let cantidadArticulos = document.querySelectorAll(".item").length
    for (let i = 0; i < cantidadArticulos; i++) {
        let card = document.querySelectorAll(".grid-contendedor-cards .item");
        let nombre = document.querySelectorAll(".grid-contendedor-cards .item label");
        card[i].dataset.etiquetas = nombre[i].textContent.toLowerCase();
        card[i].dataset.categoria = articulo[i].tipo;
    }
}

cargarImagenes();
seleccionarEnlaces();
cargarArticulos();

setInterval(actualizarPagina, 0000);
