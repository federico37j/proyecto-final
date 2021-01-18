import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import * as fs from 'fs';
import { Articulo } from 'src/articulo/articulo.entity';
import { Imagen_articulo } from 'src/imagen-articulo/imagen-articulo.entity';
import { Equal, Repository } from 'typeorm';
import { Carrito } from './carrito.entity';



@Injectable()
export class CarritoService {

    // private articulosCarrito = [];

    constructor(
        @InjectRepository(Carrito)
        private readonly carritoRepository: Repository<Carrito>
    ) { }

    /**
     * 
     * Obtener instancias del carrito.
     * 
    **/
    //Antes del refactoring
    // public getCarrito(): any {
    //     try {
    //         let texto: string = fs.readFileSync('resources/carrito.csv', 'utf8');

    //         let palabras: string[] = texto.split('\n');
    //         let textoFinal = [];
    //         this.articulosCarrito = [];

    //         for (let i = 0; i < palabras.length - 1; i++) {
    //             textoFinal[i] = palabras[i].split(",")
    //         }

    //         for (let i = 0; i < textoFinal.length; i++) {
    //             let articulo = {
    //                 'idArticulo': textoFinal[i][0],
    //                 'nombre': textoFinal[i][1],
    //                 'precio': textoFinal[i][2],
    //                 'cantidad': textoFinal[i][3],
    //                 'stock': textoFinal[i][4],
    //                 'imagenes': textoFinal[i][5]

    //             };
    //             this.articulosCarrito.push(articulo);
    //         }
    //     }
    //     catch (error) {
    //         console.log("no hay archivo");
    //         return "";
    //     }
    //     return this.articulosCarrito;
    // }
    //Despues del refactoring (Se trae las instancias que hay en el carrito del usuario que esta logueado)
    public async getCarritoByIdUsuario(idUsuario: number): Promise<Carrito[]> {
        try {
            const result = await this.carritoRepository
                .createQueryBuilder('CARRITO')
                .addSelect('A.nombre')
                .addSelect('A.precio')
                .addSelect('A.stock')
                .addSelect('IMG.imagen')
                .innerJoin(Articulo, 'A', 'CARRITO.idArticulo = A.idArticulo')
                .innerJoin(Imagen_articulo, 'IMG', 'A.idArticulo = IMG.idArticulo')
                .where(`CARRITO.idUsuario = ${idUsuario} AND IMG.principal = 1`)
                .getRawMany();
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async getCarritoById(idCarrito: number): Promise<Carrito> {
        try {
            const ARTICULO_ENCONTRADO: Carrito = await this.carritoRepository.findOne({
                relations: ["articulo"],
                where: [
                    { "idCarrito": Equal(idCarrito) }
                ]
            });
            if (ARTICULO_ENCONTRADO) {
                return ARTICULO_ENCONTRADO;
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
    /**
     * 
     * Crear una instancia en carrito.
     * 
    **/
    //Antes del refactoring
    // public create(producto: any) {
    //     console.log(producto);
    //     const url: string = `resources/carrito.csv`;
    //     let cantidad = this.getCantidad(producto);
    //     if (cantidad > 1) {
    //         if (cantidad <= producto["stock"]) {
    //             this.actualizarCarrito();
    //         }
    //     }
    //     else {
    //         let articulo = { "idArticulo": producto["idArticulo"], "nombre": producto["nombre"], "precio": producto["precio"], "cantidad": cantidad, "stock": producto["stock"], "imagenes": this.getImagenes(producto.imagen_articulo) }
    //         this.articulosCarrito.push(articulo);
    //         fs.appendFileSync(url, `${articulo.idArticulo},${articulo.nombre},${articulo.precio},${articulo.cantidad},${articulo.stock}, ${articulo.imagenes}\n`);
    //     }
    //     return "ok"
    // }
    //Despues del refactoring (Se crea una nueva instancia en el carrito, si el articulo ya existe le aumento la cantidad)
    public async addArticuloCarrito(numeroUsuario: number, numeroArticulo: number): Promise<Carrito> {
        const CANT_MINIMA: number = 1;
        let articuloQueCoincide = await this.obtenerArticuloEnCarrito(numeroArticulo, numeroUsuario);
        try {
            if (articuloQueCoincide === undefined) {
                const carritoCreado = await this.carritoRepository.save(new Carrito(
                    CANT_MINIMA,
                    numeroArticulo,
                    numeroUsuario
                ));

                if (carritoCreado) {
                    return carritoCreado;
                } else {
                    throw new HttpException('No se pudo crear el carrito', HttpStatus.NOT_FOUND);
                }
            } else {
                this.updateCantidadArticulo(articuloQueCoincide);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
    //Busco si existe en el carrito un artículo igual para ese usuario.
    private async obtenerArticuloEnCarrito(idArticulo: number, idUsuario: number): Promise<Carrito> {
        try {
            const result = await this.carritoRepository.findOne({
                where: [
                    { "idArticulo": Equal(idArticulo), "idUsuario": Equal(idUsuario) }
                ]
            });
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //A la cantidad le sumo 1 y actualizo el artículo 
    private async updateCantidadArticulo(updateArticulo: any) {
        try {
            let cantidadTotal = updateArticulo.getCantidad();
            cantidadTotal = cantidadTotal += 1;
            updateArticulo.setCantidad(cantidadTotal);
            await this.carritoRepository.save(updateArticulo);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    // public rewrite(producto: any) {
    //     const url: string = `resources/carrito.csv`;
    //     let articulo = { "idArticulo": producto["idArticulo"], "nombre": producto["nombre"], "precio": producto["precio"], "cantidad": producto["cantidad"], "stock": producto["stock"], "imagenes": producto["imagenes"] }
    //     fs.appendFileSync(url, `${articulo.idArticulo},${articulo.nombre},${articulo.precio},${articulo.cantidad},${articulo.stock},${articulo.imagenes}\n`);
    //     return "ok"
    // }

    // private getCantidad(articulo): number {
    //     let cantidad: number = 1;
    //     try {
    //         for (let i = 0; i < this.articulosCarrito.length; i++) {
    //             if (this.articulosCarrito[i].idArticulo == articulo.idArticulo) {
    //                 this.articulosCarrito[i].cantidad = parseInt(this.articulosCarrito[i].cantidad) + 1;

    //                 return this.articulosCarrito[i].cantidad;
    //             }
    //         }
    //     }
    //     catch (error) {
    //         console.log("entro a getcantidad no hay archivo");
    //     }
    //     return cantidad;
    // }

    // public getImagenes(jsonImagenes) {
    //     let listaImagenes: string[] = [];
    //     for (let i = 0; i < jsonImagenes.length; i++) {
    //         listaImagenes.push(jsonImagenes[i].imagen);
    //     }
    //     return listaImagenes;
    // }

    // public vaciarCarrito(): boolean {
    //     const url: string = `resources/carrito.csv`;
    //     this.articulosCarrito = [];
    //     fs.unlinkSync(url);

    //     return this.articulosCarrito.length == 0;
    // }


    /**
       * 
       * Elimino una instancia del carrito.
       * 
      **/
    //Antes del refactoring
    // public deleteProducto(position: number): boolean {
    //     let removed = this.articulosCarrito.splice(position, 1);
    //     console.log(removed)
    //     this.actualizarCarrito();
    //     return removed.length == 1;
    // }
    //Despues del refactoring (Elimino la instancia según el id)
    public deleteProducto(idCarrito: number) {
        try {
            let removed = this.carritoRepository.delete(idCarrito);
            return removed;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    /**
      * 
      * Elimino las instancias del carrito para el usuario que llega por parámetro.
      * 
     **/
    //Antes del refactoring
    // public vaciarCarrito(): boolean {
    //     const url: string = `resources/carrito.csv`;
    //     this.articulosCarrito = [];
    //     fs.unlinkSync(url);
    // return this.articulosCarrito.length == 0;
    // }

    //Despues del refactoring (Borro las instancias del carrito para ese usuario)
    public async vaciarCarrito(idUsuario: number) {
        try {
            await this.carritoRepository.query(`DELETE FROM CARRITO WHERE idUsuario = ${idUsuario}`);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    /**
        * 
        * Actualizo la cantidad dependiendo de lo que seleccione el usuario en el front.
        * 
    **/
    //Despues del refactoring (a la cantidad le resto o le sumo 1)
    public async updateCantidad(valor: any, position: number): Promise<Carrito> {
        let articuloCarrito: Carrito = await this.getCarritoById(position);
        let cantidad: number = articuloCarrito.getCantidad();
        if (valor.operacion == "sumar") {
            if (cantidad < articuloCarrito["articulo"]["stock"]) {
                cantidad += 1;
                articuloCarrito.setCantidad(cantidad);
                this.carritoRepository.save(articuloCarrito);
            }
        } else {
            if (cantidad > 0) {
                cantidad -= 1;
                articuloCarrito.setCantidad(cantidad);
                this.carritoRepository.save(articuloCarrito);
            }
        }
        // this.actualizarCarrito();
        return articuloCarrito;
    }
}   
