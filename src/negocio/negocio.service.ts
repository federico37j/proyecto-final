import { Injectable } from '@nestjs/common';
import { Articulo } from './articulo';
import { Usuario } from './usuario';
import * as fs from 'fs';

@Injectable()
export class NegocioService {
    private listaUsuarios = [];


    //creo el usuario que se registra en el sistema
    create(user: Usuario): string {
        const priUser = new Usuario(user['mail'], user['contraseña'], user['direccion'], user['ciudad']);
        console.log(priUser);
        if (priUser.getMail() && priUser.getContraseña()) {
            this.listaUsuarios.push(priUser);
            console.log(priUser);
            fs.appendFileSync('resources/usuarios.csv',
                "\n" +
                priUser.getMail() + ","
                + priUser.getContraseña() + ","
                + priUser.getDireccion() + ","
                + priUser.getCiudad());
            return "ok";
        }
        else
            throw new Error('Parametros incorrectos.');
    }

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
            let urlImagenes = [elementos[i][5], elementos[i][6], elementos[i][7], elementos[i][8]];
            let articulo = new Articulo(elementos[i][0], elementos[i][1], elementos[i][2], elementos[i][3], elementos[i][4], urlImagenes);
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
