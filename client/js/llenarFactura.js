"use strict";

async function loadFactura(idFactura) {
    const URL = `/factura/${idFactura}`;
    try {
        let response = await fetch(URL);
        if (response.ok) {
            let factura = await response.json();
            console.log("Factura", factura);
            document.querySelector("#fecha_emision").textContent = (factura[0].factura_fecha).slice(0, 10);
            document.querySelector("#nombre_local").textContent = factura[0].l_nombre;
            document.querySelector("#codigo_area_local").textContent = factura[0].l_codigo_area;
            document.querySelector("#tel_local").textContent = factura[0].l_nro_telefono;
            document.querySelector("#direccion_local").textContent = factura[0].l_direccion;
            document.querySelector("#cuit_local").textContent = factura[0].l_cuit;
            document.querySelector("#email_usuario").textContent = factura[0].u_email;
            document.querySelector("#direccion_usuario").textContent = factura[0].u_direccion;
            document.querySelector("#ciudad_usuario").textContent = factura[0].u_ciudad;
            document.querySelector("#total_final").textContent = factura[0].factura_total;

            cargarDetalleFactura(factura);
            crearQr();
        } else {
            console.log("Error - Failed URL!");
        }
    }
    catch (response) {
        console.log("Connection error", response);
    }
}

function cargarDetalleFactura(factura) {
    let html = "";
    for (let i = 0; i < factura.length; i++) {
        html +=
        `<tr>
        <th>${factura[i].df_cantidad}</th>
        <td>${factura[i].a_nombre}</td>
        <td>${factura[i].a_precio}</td>
        <td>${(factura[i].a_precio * factura[i].df_cantidad)}</td>
        </tr>`
    }
    document.querySelector("#detalle-tabla").innerHTML = html;
}
