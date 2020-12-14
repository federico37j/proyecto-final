import { Factura } from 'src/factura/factura.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('LOCAL')
export class Local{

    @PrimaryGeneratedColumn()
    private idLocal: number;

    @Column()
    private cuit: string;

    @Column()
    private nombre: string;

    @Column()
    private direccion: string;

    @Column()
    private codigo_area: number;

    @Column()
    private nro_telefono: number;

    @OneToMany((type) => Factura, factura => factura.local)
    public factura: Factura[]; 

    public constructor(cuit?:string,nombre?:string,direccion?:string,codigo_area?:number, nro_telefono?:number){
        this.cuit = cuit;
        this.nombre = nombre;
        this.direccion = direccion;
        this.codigo_area = codigo_area;
        this.nro_telefono = nro_telefono;
    }

    public getID(){
        return this.idLocal;
    }

    public setID(idLocal:number){
        this.idLocal = idLocal;
    }

    public getNombre():string{
        return this.nombre;
    }

    public getCuit():string{
        return this.cuit;
    }

    public getDireccion():string{
        return this.direccion;
    }

    public getCodigo_area():number{
        return this.codigo_area;
    }

    public getNro_telefono():number{
        return this.nro_telefono;
    }
}