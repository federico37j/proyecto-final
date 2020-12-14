let total_final = document.querySelector("#total_final");
let fecha_emision = document.querySelector("#fecha_emision");
let nombre_local = document.querySelector("#nombre_local");
let direccion_local = document.querySelector("#direccion_local");
let email_usuario = document.querySelector("#email_usuario");

function crearQr() {
    let factura = `        Fecha de Emisión: ${fecha_emision.textContent}
                   Razón social: ${nombre_local.textContent}
                   Dirección: ${direccion_local.textContent}
                   Email comprador: ${email_usuario.textContent}
                   TOTAL FINAL: $${total_final.textContent}`;
    var url = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${factura}`;

    var img = document.querySelector("#img_qr");

    img.src = url;
    console.log(url);
}

