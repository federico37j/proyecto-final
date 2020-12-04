let btnLogin = document.querySelector("#IngresoLog");
btnLogin.addEventListener("click", ingresar);

async function ingresar() {
    console.log("Funcion ingresar admin");
    let correo = document.querySelector('#mail').value;
    let password = document.querySelector('#pwd').value;
    console.log("mail:",correo);
    console.log("pwd: ",password);
    let user = {
        "mail": correo,
        "contrasena":password
    }
    
    let respuesta = await fetch('http://localhost:3000/login/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (await respuesta.json()) {
        console.log("Bienvenido/a ",user.mail);
        window.sessionStorage.setItem("userLogged", true);
        window.sessionStorage.setItem("user", user.mail);
        window.location="http://localhost:3000/html/administrador.html";
    }
}

ingresar();

function cerrarSesion(){
    window.sessionStorage.clear();
}