import { Detalle_factura } from 'src/detalle-factura/detalle-factura.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FACTURA')
export class Factura {

    @PrimaryGeneratedColumn()
    private idFactura: number;

    @Column()
    private fecha: Date;

    @Column()
    private total: number;

    @Column()
    private idLocal: number;

    @Column()
    private idUsuario: number;

    @OneToMany((type) => Detalle_factura, detalle_factura => detalle_factura.factura)
    public detalle_factura: Detalle_factura[];

    
    /*
        @OneToMany((type) => Imagen_articulo, imagen_articulo => imagen_articulo.articulo)
    public imagen_articulo: Imagen_articulo[];
    */

    public constructor(fecha?: Date, total?: number, idLocal?: number, idUsuario?: number) {
        this.fecha = fecha;
        this.total = total;
        this.idLocal = idLocal;
        this.idUsuario = idUsuario;
    }

    public getNroFactura(): number {
        console.log("entra a get nro factura");
        return this.idFactura;
    }

    public setNroFactura(idFactura: number) {
        this.idFactura = idFactura;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public setFecha(fecha: Date) {
        this.fecha = fecha;
    }

    public getTotal(): number {
        return this.total;
    }

    public setTotal(total: number) {
        this.total = total;
    }

    public getNroLocal(): number {
        return this.idLocal;
    }

    public setNroLocal(idLocal: number) {
        this.idLocal = idLocal;
    }

    public getNroUsuario(): number {
        return this.idUsuario;
    }

    public setNroUsuario(idUsuario: number) {
        this.idUsuario = idUsuario;
    }

}