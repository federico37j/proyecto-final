import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';
import { FacturaDTO } from './factura.dto';


@Controller('factura')
export class FacturaController {

    constructor(private facturaService: FacturaService) { }

    @Post()
    createFactura(@Body() suma: any): Promise<string> {
        console.log("llega al controller");
        return this.facturaService.createFactura(suma)
    
    }

    @Get("get-all")
    public getAllProductos(): Promise<Factura[]>{
        return this.facturaService.getAll();
    }

    @Get(":id")
    public getByFactura(@Param("id") id: number){
        return this.facturaService.getByFactura(id);
    }


}
