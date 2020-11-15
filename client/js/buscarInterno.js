
let btnSuscribir = document.querySelector('#btn-suscribir');
const conSearch = document.querySelector('.con-search');

let arrArticulos = [];

//Traigo los datos del csv con un get por categoría.
async function traerArticulos(categoria) {
  const URL = `/stock/${categoria}`;
  try {
    let response = await fetch(URL);
    if (response.ok) {
      let listadoArticulos = await response.json();
      cargarArrayGlobal(listadoArticulos, categoria);
    }

  } catch (response) {
    console.log("Error en la conexión", response);
  }
}

//Creo el JSON y lo guardo en arreglo global.
function cargarArrayGlobal(listadoArticulos, categoria) {
  for (let i = 0; i < listadoArticulos.length; i++) {
    let articulo = {
      "href": `http://localhost:3000/html/detalle_producto.html?categoria=${categoria}&index=${i}`,
      "nombre": cortarNombre(listadoArticulos[i].nombre),
      "precio": listadoArticulos[i].precio,
      "financiacion": listadoArticulos[i].financiacion,
      "detalle": listadoArticulos[i].detalle,
      "tipo": listadoArticulos[i].tipo,
      "stock": listadoArticulos[i].stock,
      "imagenes": listadoArticulos[i].imagenes
    }
    arrArticulos.push(articulo);
  }

}

// Dejo nombres con un máximo de 35 caracteres.
function cortarNombre(nombre) {
  const LIMITECARACTERES = 35;
  if (nombre.length > LIMITECARACTERES) {
    return nombre.slice(0, LIMITECARACTERES);
  }
  return nombre;
}

document.querySelector('.bx-x').addEventListener('click', function () {
  conSearch.querySelector('input').value = '';
  conSearch.classList.add('notValue');
});

function handleFocus(evt) {
  if (evt.target.value) {
    conSearch.classList.add('focus');
  }
}

function handleBlur() {
  conSearch.classList.remove('focus');
}

//Busco las coincidencias.
function handleSearch(evt) {
  const value = evt.target.value;
  const newArt = arrArticulos.filter((articulo) => {
    delete articulo.detalle
    delete articulo.tipo
    delete articulo.stock
    delete articulo.imagenes
    const string = JSON.stringify(articulo).toLowerCase();
    if (string.indexOf(value.toLowerCase()) !== -1) {
      return articulo;
    }
  })
  renderResults(newArt, value);
}

function renderResults(results, value) {
  const conResults = document.querySelector('.con-results');
  conResults.innerHTML = '';

  if (!value) {
    conSearch.classList.remove('focus');
    conSearch.classList.add('notValue');
    return
  }

  conSearch.classList.remove('notValue');
  conSearch.classList.add('focus');
  results.forEach((result) => {
    const resultElement = document.createElement('div');
    const btn_result = document.createElement('a');
    btn_result.href = result.href;
    resultElement.className = 'result';
    const nombre = document.createElement('h4');
    const financiacion = document.createElement('p');
    const precio = document.createElement('div');
    precio.className = 'financiacion';
    nombre.innerHTML = result.nombre.toLowerCase().replace(value, `<b>${value}</b>`);
    financiacion.innerHTML = result.financiacion.toLowerCase().replace(value, `<b>${value}</b>`);
    precio.innerHTML = `$${result.precio.toLowerCase().replace(value, `<b>${value}</b>`)}`;
    btn_result.appendChild(resultElement);
    resultElement.appendChild(nombre);
    resultElement.appendChild(financiacion);
    resultElement.appendChild(precio);
    resultElement.classList.add('hidden');
    conResults.appendChild(btn_result);
    setTimeout(() => {
      resultElement.classList.remove('hidden');
    }, 20);
  })
}

traerArticulos("tecnologia");
traerArticulos("electrodomesticos");
traerArticulos("deportes");

//Al escribir el usuario valido que en el campo haya un email valido.
let inputSuscribir = document.querySelector('.suscribir input');
inputSuscribir.addEventListener('input', evt => {
  const value = evt.target.value;
  const emailRegex = /[a-z0-9]+@+[a-z]+.com/;

  if (emailRegex.test(value.trim())) {
    evt.target.classList.add('valid');
    evt.target.classList.remove('invalid');
  } else {
    evt.target.classList.add('invalid');
    evt.target.classList.remove('valid');
  }

  if (!value) {
    evt.target.classList.remove('invalid');
  }

});

//Al hacer click en suscribir valido que el campo no este vacío.
btnSuscribir.addEventListener('click', function (e) {
  if (inputSuscribir.value.length == 0) {
    inputSuscribir.value = ' Ingresa tu email para continuar...';
  } else if (inputSuscribir.value.length > 0 && inputSuscribir.classList.contains('valid')) {
    inputSuscribir.value = '   Ya estás suscripto a nuestras promociones!';
  } else {
    inputSuscribir.value = '   El email es invalido!';
  }
});