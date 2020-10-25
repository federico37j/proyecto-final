export class Usuario{
    private mail: string;
    private contrasena: string;
    private direccion: string;
    private ciudad: string;

    public constructor(mail,contrasena,direccion,ciudad){
        this.mail = mail;
        this.contrasena = contrasena;
        this.direccion = direccion;
        this.ciudad = ciudad;
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
}