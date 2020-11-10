import { Injectable } from '@nestjs/common';
import { Articulo } from 'src/negocio/articulo';
import * as fs from 'fs';

@Injectable()
export class StockService {
    private listadoArticulos = [];
    
    // Traigo los datos que contiene el archivo .csv y lo convierto en objeto Articulo.
    private loadArticulo(url: string): Articulo[] {

        let archivo = fs.readFileSync(url, 'utf8');
        let lineas = archivo.split('\n');
        const elementos = [];
        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i].replace('\r', '');
            let p = linea.split(',');
            elementos.push(p);
        }
        this.listadoArticulos = [];
        for (let i = 0; i < elementos.length; i++) {
            let urlImagenes = [elementos[i][6], elementos[i][7], elementos[i][8], elementos[i][9]];
            let articulo = new Articulo(elementos[i][0], elementos[i][1], elementos[i][2], elementos[i][3],
                elementos[i][4], Number(elementos[i][5]), urlImagenes);
            this.listadoArticulos.push(articulo);
        }
        return this.listadoArticulos;
    }

    // Devuelvo un artículo según la categoría e índex.
    public getArticulo(categoria: string, index: number): Articulo {
        let articulos: Articulo[] = [];

        switch (categoria) {
            case 'tecnologia':
                articulos = this.loadArticulo('resources/tecnologia.csv');
                break;

            case 'electrodomesticos':
                articulos = this.loadArticulo('resources/electrodomesticos.csv');
                break;

            case 'deportes':
                articulos = this.loadArticulo('resources/deportes.csv');
                break;
        }
        return articulos[index];
    }

    // Devuelvo los artículos según la categoría.
    public getArticulosCategoria(oper: string): Articulo[] {
        let url: string = `resources/${oper}.csv`;
        return this.loadArticulo(url);
    }

    public getListadoArticulos(): Articulo[] {
        return this.listadoArticulos;
    }

    public addArticulo(art: any, categoria: String): string {
        const url: string = `resources/${categoria}.csv`;
        const articulo = new Articulo(art.nombre,Number(art.precio),
        art.financiacion,art.detalle,art.tipo,Number(art.stock),art.imagenes);
        console.log(articulo)
        if(articulo.getNombre() && articulo.getPrecio() && articulo.getFinanciacion() && articulo.getDetalle() && articulo.getTipo()
        && articulo.getStock()){
        fs.appendFileSync(url,
            `\n${this.getArticuloLine(articulo)}`);
            return "ok";
        } else {
            return "Parametros incorrectos";
        }
    }

    public updateArticulo(art: any, categoria: any, index: number): boolean {
        const articulo = new Articulo(art.nombre, art.precio, art.financiacion, art.detalle, art.tipo, art.stock, art.imagenes);
        this.listadoArticulos[index] = articulo;
        console.log(this.listadoArticulos[index])
        this.actualizarArchivo(categoria);
        return true;
    }

    public deleteArticulo(categoria: any, index: number): boolean {
        let eliminado = this.listadoArticulos.splice(index, 1);
        this.actualizarArchivo(categoria);
        return eliminado.length == 1;
    }

    private actualizarArchivo(categoria: string) {
        const url: string = `resources/${categoria}.csv`;
        if (this.listadoArticulos.length > 0) {
            fs.writeFileSync(url,
                this.getArticuloLine(this.listadoArticulos[0])
            );
        } else {
            fs.writeFileSync(url, '');
        }
        for (let i = 1; i < this.listadoArticulos.length; i++) {
            fs.appendFileSync(url,
                `\n${this.getArticuloLine(this.listadoArticulos[i])}`);
        }
    }

    private getArticuloLine(articulo: Articulo): string {
        return `${articulo.getNombre()},${articulo.getPrecio()},${articulo.getFinanciacion()},${articulo.getDetalle()},${articulo.getTipo()},${articulo.getStock()},${articulo.getImagen()}`;
    }

}
