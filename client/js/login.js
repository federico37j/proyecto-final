let btnLogin = document.querySelector("#IngresoLog");
btnLogin.addEventListener("click", ingresar);

let usuario = {
    "email": "micorreo@yo.com",
    "cuit": "12345",
    "password": "mipassword"
};

async function ingresar() {
    console.log("Funcion ingresar");
    let container = document.querySelector("#Contenedor");
    // voy a buscar los valores cargados en los inputs
    let correo = document.querySelector('#Correo').value;
    let cuit = document.querySelector('#Cuit').value;
    let password = document.querySelector('#Pwd').value;

    /*  VERSION PRUEBA FRONT
        if (correo === usuario.email && cuit === usuario.cuit && password === usuario.password){
            console.log("ingreso al sistema");
        }
        else{
            alert("Datos ingresados incorrectos");
        }
    */

    if(correo === "" && cuit === "" && password === ""){
        correo = "micorreo@yo.com";
        cuit = "12345",
        password = "mipassword";
    }
    
    try {
        let response = await fetch("http://localhost:3000/mocklogin.json");
        if (response.ok) {
            let t = await response.json();
            let users = t.usuarios;
            console.log()
            if (correo === users[0].email && cuit === users[0].cuit && password === users[0].password) {
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