import { Body, Controller, Post } from '@nestjs/common';
import { FacturaService } from './factura.service';


@Controller('factura')
export class FacturaController {

    constructor(private facturaService: FacturaService) { }

    @Post()
    createFactura(@Body() suma: any): string {
        console.log("llega al controller");
        return this.facturaService.createFactura(suma)
    
    }

}
