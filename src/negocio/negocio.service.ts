import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario';
import * as fs from 'fs';
import { Vendedor } from './vendedor';

@Injectable()
export class NegocioService {
    private listaUsuarios = [];

    //creo el usuario que se registra en el sistema
    create(user: Usuario): string {
        const priUser = new Usuario(user['id_user'],user['mail'], user['contrasena'], user['direccion'], user['ciudad'],user['esAdmin']);
        console.log("user (Bk):",priUser);
        if (priUser.getMail() && priUser.getContraseña()) {
            this.listaUsuarios.push(priUser);
            console.log(priUser);
            fs.appendFileSync('resources/usuarios.csv',
                "\n" +
                priUser.getID() + "," 
                + priUser.getMail() + ","
                + priUser.getContraseña() + ","
                + priUser.getDireccion() + ","
                + priUser.getCiudad() + ","
                + priUser.isItAdmin());
            return "ok";
        }
        else
            throw new Error('Parametros incorrectos.');
    }

    addVendedor(vddr: Vendedor): string {
        const priVdr = new Vendedor(vddr['usuario'], vddr['cuit'], vddr['contrasena'], vddr['fechaIngreso'], vddr['direccion']);
        console.log(priVdr);
        if (priVdr.getUsuario() && priVdr.getCuit() > 0 && priVdr.getContraseña()) {
            this.listaUsuarios.push(priVdr);
            console.log(priVdr);
            fs.appendFileSync('resources/vendedores.csv',
                "\n" +
                priVdr.getUsuario() + ","
                + priVdr.getCuit() + ","
                + priVdr.getContraseña() + ","
                + priVdr.getFechaIngreso() + ","
                + priVdr.getDireccion());
            return "ok";
        }
        else
            throw new Error('Parametros incorrectos.');
    }

}
