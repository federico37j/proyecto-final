import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articulo } from 'src/articulo/articulo.entity';
import { Detalle_factura } from 'src/detalle-factura/detalle-factura.entity';
import { Local } from 'src/local/local.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { Factura } from './factura.entity';

@Injectable()
export class FacturaService {
    constructor(
        @InjectRepository(Factura)
        private readonly facturaRepository: Repository<Factura>,

        @InjectRepository(Detalle_factura)
        private readonly detalleFacturaRepository: Repository<Detalle_factura>,

        @InjectRepository(Usuario)
        private readonly usuarioFacturaRepository: Repository<Usuario>
    ) { }

    /**
     * 
     * Se crea una nueva instancia de factura, si se crea correctamente ahí se llama al agregar detalle factura.
     * 
    **/
    public async createFactura(datos: any): Promise<Factura> {
        try {
            if (datos != {}) {
                const facturaCreada: Factura = await this.facturaRepository.save(new Factura(
                    datos.fecha,
                    Number(datos.suma),
                    Number(datos.idLocal),
                    Number(datos.idUsuario),
                )
                );

                if (facturaCreada.getNroFactura()) {
                    this.addDetalleFactura(datos.productos, facturaCreada.getNroFactura())
                    return facturaCreada;
                }
            } else {
                throw new HttpException('No se pudo crear la factura', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 
     * Se van insertando los detalles de factura en la tabla.
     * 
    **/
    public async addDetalleFactura(newProductos: any[], nroFactura: number) {
        try {
            for (let i = 0; i < newProductos.length; i++) {
                //    console.log("entro al for con i= "++ " cantidad "+ newProductos[0].cantidad + " id_art " + newProductos[i].idArticulo);
                const detalleCreado: Detalle_factura = await this.detalleFacturaRepository.save(new Detalle_factura(
                    Number(newProductos[i].CARRITO_cantidad),
                    Number(newProductos[i].CARRITO_idArticulo),
                    Number(nroFactura)
                ));
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    /**
       * 
       * Se traen todas las facturas de la tabla FACTURA.
       * 
    **/
    public async getAll(): Promise<Factura[]> {
        try {
            const result: Factura[] = await this.facturaRepository.find();
            return result
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
    // const result: Factura = await this.facturaRepository.findOne({
    //     relations: ["local","usuario","detalle_factura"],
    //     where: [{
    //         "idFactura": Equal(facturaId)
    //     }]
    // });

    /**
       * 
       * Se trae la factura según el id que viene por parámetro, haciendo un JOIN con la tabla usuario, local, detalle_factura y articulo.
       * 
    **/
    public async getByFactura(facturaId): Promise<Factura[]> {
        // console.log("Get All Factura")
        try {
            const result = await this.facturaRepository
                .createQueryBuilder('factura')
                .addSelect('u.email')
                .addSelect('u.direccion')
                .addSelect('u.ciudad')
                .addSelect('l.cuit')
                .addSelect('l.nombre')
                .addSelect('l.direccion')
                .addSelect('l.codigo_area')
                .addSelect('l.nro_telefono')
                .addSelect('df.cantidad')
                .addSelect('df.idArticulo')
                .addSelect('a.nombre')
                .addSelect('a.precio')
                .innerJoin(Usuario, 'u', 'u.idUsuario = factura.idUsuario')
                .innerJoin(Local, 'l', 'l.idLocal = factura.idLocal')
                .innerJoin(Detalle_factura, 'df', 'df.idFactura = factura.idFactura')
                .innerJoin(Articulo, 'a', 'df.idArticulo = a.idArticulo')
                .where(`factura.idFactura = ${facturaId}`)
                .getRawMany();
            return result

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

}
