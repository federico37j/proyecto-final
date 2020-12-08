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
                    'id_articulo': textoFinal[i][0],
                    'nombre': textoFinal[i][1],
                    'precio': textoFinal[i][2],
                    'cantidad': textoFinal[i][3],
                    'imagenes': textoFinal[i][4]
                    
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
        let cantidad = this.getCantidad(producto);
        if(cantidad>1){
            this.actualizarCarrito();
        }
        else{
            let articulo = { "id_articulo": producto["id_articulo"], "nombre": producto["nombre"], "precio": producto["precio"],"cantidad":cantidad, "imagenes": producto["imagenes"] }
            this.articulosCarrito.push(articulo);
            fs.appendFileSync(url, `${articulo.id_articulo},${articulo.nombre},${articulo.precio},${articulo.cantidad},${articulo.imagenes}\n`);
        }
        return "ok"
    }
    public rewrite(producto: any) {
        const url: string = `resources/carrito.csv`;
        let articulo = { "id_articulo": producto["id_articulo"], "nombre": producto["nombre"], "precio": producto["precio"],"cantidad":producto["cantidad"], "imagenes": producto["imagenes"] }
        fs.appendFileSync(url, `${articulo.id_articulo},${articulo.nombre},${articulo.precio},${articulo.cantidad},${articulo.imagenes}\n`);
        return "ok"
    }

    private getCantidad(articulo):number{
        console.log("entro a getCantidad");
        let cantidad: number =1;
        try {   
                for (let i = 0; i < this.articulosCarrito.length; i++) {
                    if (this.articulosCarrito[i].id_articulo == articulo.id_articulo) {
                        this.articulosCarrito[i].cantidad=parseInt(this.articulosCarrito[i].cantidad) + 1;

                        return this.articulosCarrito[i].cantidad;
                    }                          
            }
        }
        catch (error) {
            console.log("entro a getcantidad no hay archivo");
        }
        return cantidad;
    }
    public deleteProducto2(position: number): boolean {
      // let removed = this.articulosCarrito.splice(position, 1);
       // console.log(removed)
    //   this.actualizarCarrito();
      //  return removed.length == 1;
      return true;
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
        console.log(removed)
        this.actualizarCarrito();
        return removed.length == 1;
    }

    private actualizarCarrito() {
        const url: string = `resources/carrito.csv`;
        fs.writeFileSync(url, '');
        console.log(this.articulosCarrito + "articulos carrito");
        for (let i = 0; i < this.articulosCarrito.length; i++) {
            console.log(this.articulosCarrito[i] + " " + i)
            this.rewrite(this.articulosCarrito[i]);
        }
        //  fs.writeFileSync(url, this.articulosCarrito);
    }


}   
