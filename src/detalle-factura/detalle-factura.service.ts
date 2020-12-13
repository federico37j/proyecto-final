import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articulo } from 'src/articulo/articulo.entity';
import { Repository } from 'typeorm';
import { Detalle_factura } from './detalle-factura.entity';

@Injectable()
export class DetalleFacturaService {

    constructor(
        @InjectRepository(Articulo)
        private readonly articuloRepository: Repository<Articulo>,

        @InjectRepository(Detalle_factura)
        private readonly detalleFacturaRepository: Repository<Detalle_factura>) { }


    public async getDetalleFactura(): Promise<Detalle_factura[]> {
        try {
            const result = await this.detalleFacturaRepository.find({
                relations: ["articulo"]
            });
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
}
