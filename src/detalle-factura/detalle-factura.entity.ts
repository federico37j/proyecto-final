import { Articulo } from 'src/articulo/articulo.entity';
import { Factura } from 'src/factura/factura.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DETALLE_FACTURA')
export class Detalle_factura {

    @PrimaryGeneratedColumn()
    private idDetalle: number;

    @Column()
    private cantidad: number;

    @Column()
    private idArticulo: number;

    @Column()
    private idFactura: number;

    @ManyToOne ((type) => Factura, factura => factura.detalle_factura)
    @JoinColumn({name: 'idFactura'})
    public factura: Factura;

    @ManyToOne ((type) => Articulo, articulo => articulo.detalle_factura)
    @JoinColumn({name: 'idArticulo'})
    public articulo: Articulo;


    public constructor(cantidad?: number, idArticulo?: number, idFactura?: number) {
        this.cantidad = cantidad;
        this.idArticulo = idArticulo;
        this.idFactura = idFactura;
    }

    public getNroDetalle(): number {
        return this.idDetalle;
    }

    public setNroDetalle(idDetalle: number) {
        this.idDetalle = idDetalle;
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

    public getNroFactura(): number {
        return this.idFactura;
    }

    public setNroFactura(idFactura: number) {
        this.idFactura = idFactura;
    }

}
