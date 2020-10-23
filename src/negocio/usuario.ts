export class Usuario{
    private mail: string;
    private contraseña: string;
    private direccion: string;
    private ciudad: string;

    public constructor(mail,contraseña,direccion,ciudad){
        this.mail = mail;
        this.contraseña = contraseña;
        this.direccion = direccion;
        this.ciudad = ciudad;
    }

    public getMail():string{
        return this.mail;
    }

    public getContraseña():string{
        return this.contraseña;
    }

    public getDireccion():string{
        return this.direccion;
    }

    public getCiudad():string{
        return this.ciudad;
    }
}