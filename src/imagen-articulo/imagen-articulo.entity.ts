import { Articulo } from 'src/articulo/articulo.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('IMAGEN_ARTICULO')
export class Imagen_articulo {

    @PrimaryGeneratedColumn()
    private idImagen: number;

    @Column()
    private imagen: string;

    @Column()
    private principal: boolean;

    @Column()
    private idArticulo: number;

    @ManyToOne ((type) => Articulo, articulo => articulo.imagen_articulo)
    @JoinColumn({name: 'idArticulo'})
    public articulo: Articulo;

    public constructor(imagen?: string, principal?: boolean, idArticulo?: number) {
        this.imagen = imagen;
        this.principal = principal;
        this.idArticulo = idArticulo;
    }

    public getNroImagen(): number {
        return this.idImagen;
    }

    public setNroImagen(idImagen: number) {
        this.idImagen = idImagen;
    }

    public getImagen(): string {
        return this.imagen;
    }

    public setImagen(imagen: string) {
        this.imagen = imagen;
    }

    public getPrincipal(): boolean {
        return this.principal;
    }

    public setPrincipal(principal: boolean) {
        this.principal = principal;
    }

    public setNroArticulo(idArticulo: number) {
        this.idArticulo = idArticulo;
    }

    public getNroArticulo(): number {
        return this.idArticulo;
    }

}  
