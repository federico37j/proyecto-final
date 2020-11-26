import { Injectable } from '@nestjs/common';
import * as fs from 'fs';



@Injectable()
export class CarritoService {
    private articulosCarrito = [];

    public getCarrito(): any {
        try {
            let texto: string = fs.readFileSync('resources/carrito.csv', 'utf8');

            let palabras: string[] = texto.split('\n');
            let textoFinal = [];
            this.articulosCarrito = [];

            for (let i = 0; i < palabras.length - 1; i++) {
                textoFinal[i] = palabras[i].split(",")
            }

            for (let i = 0; i < textoFinal.length; i++) {
                let articulo = {
                    'nombre': textoFinal[i][0],
                    'precio': textoFinal[i][1],
                    'imagenes': textoFinal[i][2]
                };
                this.articulosCarrito.push(articulo);
            }
        }
        catch (error) {
            console.log("no hay archivo");
        }
        return this.articulosCarrito;
    }
    public create(producto: any) {
        const url: string = `resources/carrito.csv`;

        let articulo = { "id_articulo": producto["id_articulo"], "nombre": producto["nombre"], "precio": producto["precio"], "imagenes": producto["imagenes"] }
        fs.appendFileSync(url, `${articulo.nombre},${articulo.precio},${articulo.imagenes},${articulo.id_articulo}\n`);
        return "ok"
    }


    public vaciarCarrito(): boolean {
        const url: string = `resources/carrito.csv`;
        /* for (let i=0; i <= this.articulosCarrito.length; i++){
            this.articulosCarrito.pop();
            
        } */
        this.articulosCarrito = [];

        fs.unlinkSync(url);

        return this.articulosCarrito.length == 0;
    }

    public deleteProducto(position: number): boolean {
        let removed = this.articulosCarrito.splice(position, 1);
        this.actualizarCarrito();
        return removed.length == 1;
    }

    private actualizarCarrito() {
        const url: string = `resources/carrito.csv`;
        fs.writeFileSync(url, '');
        for (let i = 0; i < this.articulosCarrito.length; i++) {
            this.create(this.articulosCarrito[i]);
        }
        //  fs.writeFileSync(url, this.articulosCarrito);
    }


}   
