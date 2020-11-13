import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

let texto: string = fs.readFileSync('resources/carrito.csv', 'utf8');
console.log("string")
console.log(texto)

let palabras: string[] = texto.split('\n');
let textoFinal = [];

for (let i = 0; i < palabras.length-1; i++) {
    textoFinal[i] = palabras[i].split(",")
};

@Injectable()
export class CarritoService {
    
     public getCarrito(): any {
        let articulos = [];
        for (let i = 0; i < textoFinal.length; i++) {
            let articulo = {
                'nombre': textoFinal[i][0],
                'precio': textoFinal[i][1],
                'imagenes': textoFinal [i][2]             
            };
            articulos.push(articulo);
        }
        return articulos;
    }
    public create(producto: any) {
        console.log("entro a create")
        const url: string = `resources/carrito.csv`;
        console.log(producto)
        let articulo = { "nombre": producto["nombre"],"precio": producto["precio"],"imagenes": producto["imagenes"] }
        fs.appendFileSync(url, `${articulo.nombre},${articulo.precio},${articulo.imagenes}\n`);
        return "ok"
    }

}   
