import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/negocio/usuario';
import * as fs from 'fs';

@Injectable()
export class LoginService {
    login(userInfo: any): boolean {
        let userLogged = new Usuario(userInfo['id_user'],userInfo['mail'], userInfo['contrasena'], "", "",userInfo['esAdmin']);
        // console.log("id_user: ",userInfo.id_user," esAdmin: ",userInfo.esAdmin)
        let users = this.getUsers('resources/usuarios.csv');
        // let userSel: Usuario;
        for (const user of users) {
            if(user.getMail() == userLogged.getMail()
                && user.getContraseña() == userLogged.getContraseña()){
                    // window.sessionStorage.setItem(user.getMail(),JSON.stringify(user));
                    // userSel = this.getUser(user.getMail(),user.getContraseña());
                    // if (userSel.isItAdmin()){

                    // }
                    return true;
            }
        }
        return false;
    }
 
    private getUsers(nomArch:string): Usuario[]{
        let archivo = fs.readFileSync(nomArch, 'utf8');
        const elementos = archivo.split('\n')
            .map(p => p.replace('\r', '')).map(p => p.split(','));
        let listaUsers : Usuario[] = [];
        for (let i = 0; i < elementos.length; i++) {
            let user = new Usuario(elementos[i][0],elementos[i][1],elementos[i][2],elementos[i][3],elementos[i][4],elementos[i][5]);
            listaUsers.push(user);
        }
        return listaUsers;
    }

    loginAdmin(userInfo: any): boolean {
        let userLogged = new Usuario(userInfo['id_user'],userInfo['mail'], userInfo['contrasena'], "", "",userInfo['esAdmin']);
        // console.log("mail: ",userInfo.mail," password: ",userInfo.contrasena)
        let users = this.getUsers('resources/admin.csv');
        // let userSel: Usuario;
        for (const user of users) {
            if(user.getMail() == userLogged.getMail()
                && user.getContraseña() == userLogged.getContraseña() && user.isItAdmin()){
                    return true;
            }
        }
        return false;
    }

}
