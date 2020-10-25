const { response } = require("express");

let btnRegister = document.querySelector(".btn-primary");
btnRegister.addEventListener("click", registrarUsuario);

let u_mail = document.querySelector("#inputEmail").value;
let u_pass = document.querySelector("#inputPassword").value;

let usuarios = [];

async function registrarUsuario() {
    console.log("funcion registrar usuario");
    if (u_mail != "" && u_pass != "") {
        let u_dire = document.querySelector("#inputAddress").value;
        let u_city = document.querySelector("#inputCity").value;

        let datosUsuario = {
            "mail": u_mail,
            "contrasena": u_pass,
            "direccion": u_dire,
            "ciudad": u_city,
        }
        console.log(datosUsuario);
        usuarios.push(datosUsuario);
        try{
            let response = await fetch("http://localhost:3000/articulo",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            })
            let contenido = await response.json();
            console.log(contenido);
        }
        catch{
            console.log(response);
        }
    }
    else{
        throw new Error("Campos obligatorios incompletos");
    }
}
