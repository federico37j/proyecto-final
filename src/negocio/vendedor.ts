export class Vendedor{
    private usuario: string;
    private cuit: number;
    private contraseña: string;
    private fechaIngreso: Date;
    private direccion: string;

    public constructor(usuario, cuit, contraseña, fechaIngreso, direccion){
        this.usuario = usuario;
        this.cuit = cuit;
        this.contraseña = contraseña;
        this.fechaIngreso = fechaIngreso;
        this.direccion = direccion
    }

    public getUsuario(): string{
        return this.usuario;
    }

    public getCuit():number {
        return this.cuit;
    }

    public getContraseña(): string{
        return this.contraseña;
    }

    public getFechaIngreso(): Date{
        return this.fechaIngreso;
    }

    public getDireccion(): string{
        return this.direccion;
    }
}