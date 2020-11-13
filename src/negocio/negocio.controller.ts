import { Body, Controller, Post } from '@nestjs/common';
import { NegocioService } from './negocio.service';
import { Usuario } from './usuario';
import { Vendedor } from './vendedor';

@Controller('articulo')
export class NegocioController {
    constructor(private negocioService: NegocioService) { }

    @Post()
    create(@Body() user: Usuario): string {
        return this.negocioService.create(user);
    }

    @Post()
    addVendor(@Body() vddr: Vendedor): string {
        return this.negocioService.addVendedor(vddr);
    }

}

