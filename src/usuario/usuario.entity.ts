import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('usuario')
export class Usuario{

    @PrimaryGeneratedColumn()
    private id_user: number;

    @Column()
    private mail: string;

    @Column()
    private contrasena: string;

    @Column()
    private direccion: string;

    @Column()
    private ciudad: string;

    @Column()
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

    public setID(idUser){
        this.id_user = idUser;
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