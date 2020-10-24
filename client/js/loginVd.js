let btnLogin = document.querySelector("#IngresoLog");
btnLogin.addEventListener("click", ingresar);

let usuario = {
    "usuario": "grupo4",
    "cuit": "12345",
    "password": "mipassword"
};

async function ingresar() {
    console.log("Funcion ingresar");
    let container = document.querySelector("#Contenedor");
    // voy a buscar los valores cargados en los inputs
    let user = document.querySelector('#User').value;
    let cuit = document.querySelector('#Cuit').value;
    let password = document.querySelector('#Pwd').value;

    /*  VERSION PRUEBA FRONT
        if (user === usuario.user && cuit === usuario.cuit && password === usuario.password){
            console.log("ingreso al sistema");
        }
        else{
            alert("Datos ingresados incorrectos");
        }
    */

    if(user === "" && cuit === "" && password === ""){
        user = "grupo4";
        cuit = "12345",
        password = "mipassword";
    }
    // console.log(user);
    // console.log(cuit);
    try {
        let response = await fetch("http://localhost:3000/mock/mockVddr.json");
        if (response.ok) {
            let t = await response.json();
            let users = t.usuarios;
            // console.log("usuario guardado: ",users[0].user);
            if (user === users[0].usuario && cuit === users[0].cuit && password === users[0].password) {
                console.log("ingreso al sistema");
                console.log("link a pantalla del vendedor")
            }
            else {
                alert("Datos ingresados incorrectos");
            }
        }
        else
            container.innerHTML = `<h2>Error al cargar la pagina</h2>`
    }
    catch (response) {
        container.innerHTML = `<h2>${response}</h2>`;
    };
}

ingresar();