import { Injectable } from '@nestjs/common';
import { Articulo } from 'src/stock/articulo';
import * as fs from 'fs';

@Injectable()
export class StockService {

    private articulosFilePath: string = 'resources/articulos.csv';
    private listadoArticulos: Articulo[] = [];
    private listadoArticulosCompleta: Articulo[] = [];

    constructor() {
        this.cargarListaCompletaArticulos();
    }

    // Traigo los datos que contiene el archivo .csv y lo convierto en objeto Articulo.
    private loadArticulo(categoria?: number): Articulo[] {
        let archivo = fs.readFileSync(this.articulosFilePath, 'utf8');
        let lineas = archivo.split('\n');
        const elementos = [];
        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i].replace('\r', '');
            let articulo = linea.split(',');

            if (categoria !== undefined) {
                if (Number(articulo[1]) === categoria) {
                    elementos.push(articulo);
                }
            } else {
                elementos.push(articulo);
            }
        }
        this.listadoArticulos = [];
        for (let i = 0; i < elementos.length; i++) {
            let urlImagenes = [elementos[i][8], elementos[i][9], elementos[i][10], elementos[i][11]];
            let articulo = new Articulo(elementos[i][0], elementos[i][1], elementos[i][2], elementos[i][3], elementos[i][4], elementos[i][5],
                elementos[i][6], Number(elementos[i][7]), urlImagenes);
            this.listadoArticulos.push(articulo);
        }
        return this.listadoArticulos;
    }

    private cargarListaCompletaArticulos() {
        this.listadoArticulosCompleta = this.loadArticulo();
    }

    // Devuelvo un id según la categoría.
    private categoriaStrigAid(categoria: string): number {
        let categoriaId: number = 0;
        switch (categoria.toLowerCase()) {
            case 'tecnologia':
                categoriaId = 1;
                break;

            case 'electrodomesticos':
                categoriaId = 2;
                break;

            case 'deportes':
                categoriaId = 3;
                break;
        }
        return categoriaId;
    }

    // Devuelvo un artículo según la categoría e índex.
    public getArticulo(categoria: string, index: number): Articulo {
        let articulos: Articulo[] = [];
        articulos = this.loadArticulo(this.categoriaStrigAid(categoria));
        return articulos[index];
    }

    // Devuelvo los artículos según la categoría.
    public getArticulosCategoria(categoria: string): Articulo[] {
        return this.loadArticulo(this.categoriaStrigAid(categoria));
    }

    public getListadoArticulos(): Articulo[] {
        return this.listadoArticulos;
    }

    public addArticulo(art: any, categoria: string): string {
        let ultimaPosicion = this.listadoArticulosCompleta.length + 1;
        const articulo = new Articulo(ultimaPosicion, this.categoriaStrigAid(categoria), art.nombre, Number(art.precio),
            art.financiacion, art.detalle, art.tipo, Number(art.stock), art.imagenes);
        if (articulo.getNombre() && articulo.getPrecio() && articulo.getFinanciacion() && articulo.getDetalle() && articulo.getTipo()
            && articulo.getStock()) {
            this.listadoArticulosCompleta.push(articulo);
            fs.appendFileSync(this.articulosFilePath,
                `\n${this.getArticuloLine(ultimaPosicion, articulo)}`);
            return "ok";
        } else {
            return "Parametros incorrectos";
        }
    }

    public updateArticulo(art: any, categoria: string, index: number): boolean {
        this.cargarListaCompletaArticulos();
        const articulo = new Articulo(index, this.categoriaStrigAid(categoria), art.nombre, art.precio, art.financiacion,
            art.detalle, art.tipo, art.stock, art.imagenes);
        this.listadoArticulosCompleta[index - 1] = articulo;
        this.actualizarArchivo();
        return true;
    }

    public deleteArticulo(index: number): boolean {
        this.cargarListaCompletaArticulos();
        let eliminado = this.listadoArticulosCompleta.splice(index-1, 1);
        this.actualizarArchivo();
        return eliminado.length == 1;
    }

    private actualizarArchivo() {
        // const url: string = `resources/${categoria}.csv`;
        if (this.listadoArticulosCompleta.length > 0) {
            fs.writeFileSync(this.articulosFilePath,
                this.getArticuloLine(1, this.listadoArticulosCompleta[0])
            );
        } else {
            fs.writeFileSync(this.articulosFilePath, '');
        }
        for (let i = 1; i < this.listadoArticulosCompleta.length; i++) {
            fs.appendFileSync(this.articulosFilePath,
                `\n${this.getArticuloLine(i + 1, this.listadoArticulosCompleta[i])}`);
        }
    }

    private getArticuloLine(id: number, articulo: Articulo): string {
        return `${id},${articulo.getFkCategoria()},${articulo.getNombre()},${articulo.getPrecio()},${articulo.getFinanciacion()},${articulo.getDetalle()},${articulo.getTipo()},${articulo.getStock()},${articulo.getImagen()}`;
    }

}
