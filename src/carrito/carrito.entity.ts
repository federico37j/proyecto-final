import { Articulo } from 'src/articulo/articulo.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('CARRITO')
export class Carrito {

    @PrimaryGeneratedColumn()
    private idCarrito: number;

    @Column()
    private cantidad: number;

    @Column()
    private idArticulo: number;

    @Column()
    private idUsuario: number;

    @ManyToOne((type) => Usuario, usuario => usuario.carrito)
    @JoinColumn({name: 'idUsuario'})
    public usuario: Usuario;

    @ManyToOne ((type) => Articulo, articulo => articulo.carrito)
    @JoinColumn({name: 'idArticulo'})
    public articulo: Articulo;

    public constructor(cantidad?: number, idArticulo?: number, idUsuario?: number) {
        this.cantidad = cantidad;
        this.idArticulo = idArticulo;
        this.idUsuario = idUsuario;
    }

    public getNroCarrito() {
        return this.idCarrito;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public setCantidad(cantidad: number) {
        this.cantidad = cantidad;
    }

    public getNroArticulo(): number {
        return this.idArticulo;
    }

    public setNroArticulo(idArticulo: number) {
        this.idArticulo = idArticulo;
    }

    public getNroUsuario(): number {
        return this.idUsuario;
    }

    public setNroUsuario(idUsuario: number) {
        this.idUsuario = idUsuario;
    }

}