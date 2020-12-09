import { Articulo } from 'src/articulo/articulo.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('categoria')
export class Categoria{

    @PrimaryGeneratedColumn()
    private idCategoria: number;

    @Column()
    private nombre: string;

    @OneToMany(()=>Articulo, articulo => articulo.categoria)
    public articulos:Articulo[];
    
    public constructor(nombre?:string){
        this.nombre = nombre;
    }

    public getIDCateg(){
        return this.idCategoria;
    }

    public setIDCateg(idCategoria:number){
        this.idCategoria = idCategoria;
    }

    public getNombre():string{
        return this.nombre;
    }

}