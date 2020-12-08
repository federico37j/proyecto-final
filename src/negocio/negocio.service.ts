import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario';
import * as fs from 'fs';
// import { Vendedor } from './vendedor';

@Injectable()
export class NegocioService {
    private listaUsuarios = [];

    //creo el usuario que se registra en el sistema
    create(user: Usuario): string {
        const priUser = new Usuario(user['id_user'],user['mail'], user['contrasena'], user['direccion'], user['ciudad'],user['esAdmin']);
        console.log("user (Bk):",priUser);
        if (!this.getUsuario(priUser.getMail())){
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
        else
            throw new Error('ya existe un usuario con ese mail');   
    }

    getUsuario(mail: string): Usuario {
        let archivo = fs.readFileSync('resources/usuarios.csv', 'utf8');
        const elementos = archivo.split('\n').map(p => p.replace('\r', '')).map(p => p.split(','));
        for (let i = 0; i < elementos.length; i++) {
            let user = new Usuario(elementos[i][0],elementos[i][1],elementos[i][2],elementos[i][3],elementos[i][4],elementos[i][5]);
            if (user.getMail() == mail)
                return user;
        }
        return null;
    }

    // addVendedor(vddr: Vendedor): string {
    //     const priVdr = new Vendedor(vddr['usuario'], vddr['cuit'], vddr['contrasena'], vddr['fechaIngreso'], vddr['direccion']);
    //     console.log(priVdr);
    //     if (priVdr.getUsuario() && priVdr.getCuit() > 0 && priVdr.getContraseña()) {
    //         this.listaUsuarios.push(priVdr);
    //         console.log(priVdr);
    //         fs.appendFileSync('resources/vendedores.csv',
    //             "\n" +
    //             priVdr.getUsuario() + ","
    //             + priVdr.getCuit() + ","
    //             + priVdr.getContraseña() + ","
    //             + priVdr.getFechaIngreso() + ","
    //             + priVdr.getDireccion());
    //         return "ok";
    //     }
    //     else
    //         throw new Error('Parametros incorrectos.');
    // }

}
