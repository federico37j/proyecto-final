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
                    'idArticulo': textoFinal[i][0],
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
            let articulo = { "idArticulo": producto["idArticulo"], "nombre": producto["nombre"], "precio": producto["precio"],"cantidad":cantidad, "imagenes": this.getImagenes(producto.imagen_articulo) }
            this.articulosCarrito.push(articulo);
            console.log("quiero ver stock "+  producto["stock"]);
            fs.appendFileSync(url, `${articulo.idArticulo},${articulo.nombre},${articulo.precio},${articulo.cantidad},${articulo.imagenes}\n`);
        }
        return "ok"
    }
    public rewrite(producto: any) {
        const url: string = `resources/carrito.csv`;
        let articulo = { "idArticulo": producto["idArticulo"], "nombre": producto["nombre"], "precio": producto["precio"],"cantidad":producto["cantidad"], "imagenes": producto["imagenes"] }
        fs.appendFileSync(url, `${articulo.idArticulo},${articulo.nombre},${articulo.precio},${articulo.cantidad},${articulo.imagenes}\n`);
        return "ok"
    }

    private getCantidad(articulo):number{
        let cantidad: number =1;
        try {   
                for (let i = 0; i < this.articulosCarrito.length; i++) {
                    if (this.articulosCarrito[i].idArticulo == articulo.idArticulo) {
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

    public getImagenes(jsonImagenes) {
        let listaImagenes: string[] = [];
        for (let i = 0; i < jsonImagenes.length; i++) {
            listaImagenes.push(jsonImagenes[i].imagen);
        }
        return listaImagenes;
    }

    public vaciarCarrito(): boolean {
        const url: string = `resources/carrito.csv`;
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

    public updateCantidad(valor:any,position: number): boolean {
        if (valor.operacion == "sumar"){
        this.articulosCarrito[position].cantidad=parseInt(this.articulosCarrito[position].cantidad) + 1;
        }else{
            this.articulosCarrito[position].cantidad=parseInt(this.articulosCarrito[position].cantidad) - 1;
        }
        
        this.actualizarCarrito();
        return true;
    }
}   
