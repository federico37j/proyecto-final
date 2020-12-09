var total_final = document.querySelector("#total_final").textContent;
var fecha_emision = document.querySelector("#fecha_emision").textContent;
var nombre_local = document.querySelector("#nombre_local").textContent;
var direccion_local = document.querySelector("#direccion_local").textContent;
var email_usuario = document.querySelector("#email_usuario").textContent;

function crearQr() {
    let factura = `        Fecha de Emisión: ${fecha_emision}
                   Razón social: ${nombre_local}
                   Dirección: ${direccion_local}
                   Email comprador: ${email_usuario}
                   TOTAL FINAL: $${total_final}`;
    var url = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${factura}`;

    var img = document.querySelector("#img_qr");

    img.src = url;
    console.log(url);
}

crearQr();