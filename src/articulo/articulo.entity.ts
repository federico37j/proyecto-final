import { Categoria } from 'src/categoria/categoria.entity';
import { Imagen_articulo } from 'src/imagen-articulo/imagen-articulo.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ARTICULO')
export class Articulo {

    @PrimaryGeneratedColumn()
    private idArticulo: number;

    @Column()
    private nombre: string;

    @Column()
    private precio: number;

    @Column()
    private financiacion: string;

    @Column()
    private detalle: string;

    @Column()
    private tipo: string;

    @Column()
    private stock: number;

    @Column()
    private idCategoria: number;

    @ManyToOne(()=>Categoria, categoria => categoria.articulos)
    @JoinColumn({name: 'idCategoria'})
    public categoria: Categoria;

    @OneToMany((type) => Imagen_articulo, imagen_articulo => imagen_articulo.articulo)
    public imagen_articulo: Imagen_articulo[];

    public constructor(nombre?: string, precio?: number, financiacion?: string, detalle?: string, tipo?: string, stock?: number,
        idCategoria?: number) {
        this.nombre = nombre;
        this.precio = precio;
        this.financiacion = financiacion;
        this.detalle = detalle;
        this.tipo = tipo;
        this.stock = stock;
        this.idCategoria = idCategoria;
    }

    public getNroArticulo(): number {
        return this.idArticulo;
    }

    public setNroArticulo(idArticulo: number) {
        this.idArticulo = idArticulo;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public setPrecio(precio: number) {
        this.precio = precio;
    }

    public getFinanciacion(): string {
        return this.financiacion;
    }

    public setFinanciacion(financiacion: string) {
        this.financiacion = financiacion;
    }

    public getDetalle(): string {
        return this.detalle;
    }

    public setDetalle(detalle: string) {
        this.detalle = detalle;
    }

    public setTipo(tipo: string) {
        this.tipo = tipo;
    }

    public getTipo(): string {
        return this.tipo ;
    }

    public setStock(stock: number) {
        this.stock = stock;
    }

    public getStock(): number {
        return this.stock;
    }

    public setNroCategoria(idCategoria: number) {
        this.idCategoria = idCategoria;
    }

    public getNroCategoria(): number {
        return this.idCategoria;
    }

}  
