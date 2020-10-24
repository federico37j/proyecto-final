
let mailDest = document.querySelector("#email").value;
let btnRecuperar = document.getElementById("recover");
btnRecuperar.addEventListener("click", evaluarMail);

let mailBuscado = {
    "usuario": "fede@grupo4.com",
    "contraseña": "g4g4g4"
}

async function evaluarMail() {
    let container = document.getElementsByClassName("mailDest");
    if (mailDest === "") {
        mailDest = "micorreo@yo.com";
    }
    console.log(mailDest);
    try {
        let response = await fetch("http://localhost:3000/mock/mockUsr.json");
        if (response.ok) {
            let t = await response.json();
            let users = t.usuarios;
            console.log();
            if (mailDest === users[0].email){
                console.log("se envia la contraseña al usuario que la perdio");
                redactarMail();
                send();
            }
        }
        else {
            container.innerHTML = `<h2>Error al cargar la pagina</h2>`
        }

    }
    catch (response) {
        container.innerHTML = `<h2>${response}</h2>`;

    }
}

/**
 * funcion que usa la libreria smpt para enviar un mail desde java script
 */
function send() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "soporte@grupo4.com",
        Password: "1234",
        To: mailDest,
        From: "soporte@grupo4.com",
        Subject: "soporte te envia la contraseña recuperada",
        Body: "la contraseña es: " + users[0].contraseña,
    })
        .then(function () {
            alert("mail enviado correctamente")
        });
}

// funcion que simula un mail enviado por consola
function redactarMail(){
    console.log("Origen: soporte@grupo4.com");
    console.log("Destino: ",mailDest);
    console.log("Asunto: Recuperacion de clave");
    console.log("Mensaje: Hola, gracias por comunicarte. Tu contraseña es ", users[0].contraseña);
}
evaluarMail();