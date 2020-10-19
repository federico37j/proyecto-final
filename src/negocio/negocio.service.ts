import { Injectable } from '@nestjs/common';
import { Articulo } from './articulo';
import * as fs from 'fs';

@Injectable()
export class NegocioService {

    // Traigo los datos que contiene el archivo .csv y lo convierto en objeto Articulo.
    public loadArticulo(url: string): Articulo[] {
        let listadoArticulos = [];
        let archivo = fs.readFileSync(url, 'utf8');
        let lineas = archivo.split('\n');
        const elementos = [];
        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i].replace('\r', '');
            let p = linea.split(',');
            elementos.push(p);
        }
        listadoArticulos = [];
        for (let i = 0; i < elementos.length; i++) {
            let urlImagenes = [elementos[i][4], elementos[i][5], elementos[i][6], elementos[i][7]];
            let articulo = new Articulo(elementos[i][0], elementos[i][1], elementos[i][2], elementos[i][3], urlImagenes);
            listadoArticulos.push(articulo);
        }
        return listadoArticulos;
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

}
