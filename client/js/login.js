let btnLogin = document.querySelector("#IngresoLog");
btnLogin.addEventListener("click",ingreso);

let usuario = {
    "email" : "micorreo@yo.com",
    "cuit" : "12345",
    "password" : "mipassword"
}  ;

function ingreso(){
    console.log("Funcion ingresar");
    // voy a buscar los valores cargados en los inputs
    let correo = document.querySelector('#Correo').value;
    let cuit = document.querySelector('#Cuit').value;
    let password = document.querySelector('#Pwd').value;

    if (correo === usuario.email && cuit === usuario.cuit && password === usuario.password){
        console.log("ingreso al sistema");
    }
    else{
        alert("Datos ingresados incorrectos");
    }
}