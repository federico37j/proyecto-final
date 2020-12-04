export class Usuario{
    private id_user: number;
    private mail: string;
    private contrasena: string;
    private direccion: string;
    private ciudad: string;
    private esAdmin: boolean;

    public constructor(id_user,mail,contrasena,direccion,ciudad, esAdmin){
        this.id_user = id_user;
        this.mail = mail;
        this.contrasena = contrasena;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.esAdmin = esAdmin;
    }

    public getID(){
        return this.id_user;
    }

    public getMail():string{
        return this.mail;
    }

    public getContraseña():string{
        return this.contrasena;
    }

    public getDireccion():string{
        return this.direccion;
    }

    public getCiudad():string{
        return this.ciudad;
    }

    public isItAdmin(){
        return this.esAdmin;
    }
}