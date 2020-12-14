import { Controller, Get } from '@nestjs/common';
import { Detalle_factura } from './detalle-factura.entity';
import { DetalleFacturaService } from './detalle-factura.service';

@Controller('detalle-factura')
export class DetalleFacturaController {

    constructor(private detalleFacturaService: DetalleFacturaService) { }

    @Get("get-all")
    public getDetalleFactura(): Promise<Detalle_factura[]> {
        return this.detalleFacturaService.getDetalleFactura();
    }
}
