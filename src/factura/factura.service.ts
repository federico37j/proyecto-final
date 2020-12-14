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

    public async createFactura(datos: any): Promise<Factura> {
        try {
            console.log("datos " + datos.suma);
            if(datos!={}){
            const facturaCreada: Factura = await this.facturaRepository.save(new Factura(
                datos.fecha,
                Number(datos.suma),
                Number(datos.idLocal),
                Number(datos.idUsuario),
            
            )
            );
            
            if (facturaCreada.getNroFactura()) {
                console.log("entra a detalle factura");
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

    public async addDetalleFactura(newProductos: any[], nroFactura: number) {
        try {
            console.log("entra a crear dfetalle factura");
            for (let i = 0; i < newProductos.length; i++) {
            //    console.log("entro al for con i= "++ " cantidad "+ newProductos[0].cantidad + " id_art " + newProductos[i].idArticulo);
                const detalleCreado: Detalle_factura = await this.detalleFacturaRepository.save(new Detalle_factura(
                    Number(newProductos[i].cantidad),
                    Number(newProductos[i].idArticulo),
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


 /*    console.log("Date = " + datos.fecha);
console.log(datos.productos[0].idArticulo);

let articulo = { "id_factura": "1", "fecha": datos.fecha, "total": datos.suma, "local": "1", "id_usuario": "4", "idArticulos": articulos }
fs.appendFileSync(url, `${articulo.id_factura},${articulo.fecha},${articulo.total},${articulo.local},${articulo.id_usuario},${articulo.idArticulos}\n`);
return "ok"
    }  */

    public async getAll(): Promise < Factura[] > {
    console.log("Get All Facturas")
        try {
        const result: Factura[] = await this.facturaRepository.find()
            return result

    } catch(error) {
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

public async getByFactura(facturaId){
    console.log("Get All Factura")
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
        .innerJoin(Usuario,'u','u.idUsuario = factura.idUsuario')
        .innerJoin(Local,'l','l.idLocal = factura.idLocal')
        .innerJoin(Detalle_factura,'df','df.idFactura = factura.idFactura')
        .innerJoin(Articulo,'a','df.idArticulo = a.idArticulo')
        .where(`factura.idFactura = ${facturaId}`)
        .getRawMany();
        return result

    } catch(error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "there is an error in the request, " + error,
        }, HttpStatus.NOT_FOUND);
    }
}
    
}
