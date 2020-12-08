import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FacturaService {

    public createFactura(datos: any) {
        console.log("entro a createFactura");
       console.log(datos.productos[0] + " productos");
        const url: string = `resources/Factura.csv`;
        let articulos=[];
        for (let i = 0; i < datos.productos.length; i++) {
            articulos.push(datos.productos[i].idArticulo);
            articulos.push(datos.productos[i].cantidad);
            } 

                      
        console.log("Date = " + datos.fecha);
        console.log(datos.productos[0].idArticulo);

        let articulo = { "id_factura": "1", "fecha": datos.fecha, "total": datos.suma, "local": "1", "id_usuario": "4", "idArticulos":articulos }
        fs.appendFileSync(url, `${articulo.id_factura},${articulo.fecha},${articulo.total},${articulo.local},${articulo.id_usuario},${articulo.idArticulos}\n`);
        return "ok"
    }
}
