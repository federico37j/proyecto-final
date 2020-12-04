// const { response } = require("express");

let btnRegister = document.querySelector(".btnRegUsr");
btnRegister.addEventListener("click", registrarUsuario);

let nro_user = 4;
let usuarios = [];

async function registrarUsuario() {
    console.log("funcion registrar usuario");
        let u_dire = document.querySelector("#inputAddress").value;
        let u_city = document.querySelector("#inputCity").value;
        let u_mail = document.querySelector("#inputEmail").value;
        let u_pass = document.querySelector("#inputPassword").value;
        let datosUsuario = {
            "id_user": nro_user,
            "mail": u_mail,
            "contrasena": u_pass,
            "direccion": u_dire,
            "ciudad": u_city,
            "esAdmin": false,
        }
        
        console.log("user (js): ",datosUsuario);
        usuarios.push(datosUsuario);
        let response = await fetch("http://localhost:3000/articulo/addCliente",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            })
            // let contenido = await response.json();
            // console.log(contenido);
            debugger;
        if (response.ok){
            usuarios.push(datosUsuario);
            nro_user++;
        }
        else{
            alert("no se pudo enviar el json");
        }
   
}
