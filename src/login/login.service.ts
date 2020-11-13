import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/negocio/usuario';
import * as fs from 'fs';

@Injectable()
export class LoginService {
    login(userInfo: any): boolean {
        let userLogged = new Usuario(userInfo['mail'], userInfo['contrasena'], "", "");
        // console.log("mail: ",userInfo.mail," contraseña: ",userInfo.contrasena)
        let users = this.getUsers();
        for (const user of users) {
            if(user.getMail() == userLogged.getMail()
                && user.getContraseña() == userLogged.getContraseña()){
                    return true;
            }
        }
        return false;
    }

    private getUsers(): Usuario[]{
        let archivo = fs.readFileSync('resources/usuarios.csv', 'utf8');
        const elementos = archivo.split('\n')
            .map(p => p.replace('\r', '')).map(p => p.split(','));
        let listaUsers : Usuario[] = [];
        for (let i = 0; i < elementos.length; i++) {
            let user = new Usuario(elementos[i][0],elementos[i][1],elementos[i][2],elementos[i][3]);
            listaUsers.push(user);
        }
        return listaUsers;
    }

}
