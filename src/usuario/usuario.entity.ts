import { Factura } from 'src/factura/factura.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('USUARIO')
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

    
    @OneToMany((type) => Factura, factura => factura.usuario)
    public factura: Factura[]; 


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