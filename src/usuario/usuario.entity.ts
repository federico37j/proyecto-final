import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('usuario')
export class Usuario{

    @PrimaryGeneratedColumn()
    private idUsuario: number;

    @Column()
    private email: string;

    @Column()
    private password: string;

    @Column()
    private direccion: string;

    @Column()
    private ciudad: string;

    @Column()
    private esAdmin: boolean;

    public constructor(mail?:string,contrasena?:string,direccion?:string,ciudad?:string, esAdmin?:boolean){
        this.email = mail;
        this.password = contrasena;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.esAdmin = esAdmin;
    }

    public getID(){
        return this.idUsuario;
    }

    public setID(idUser:number){
        this.idUsuario = idUser;
    }

    public getMail():string{
        return this.email;
    }

    public getContraseña():string{
        return this.password;
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