import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { NegocioService } from './negocio.service';
import { Usuario } from './usuario';
// import { Vendedor } from './vendedor';

@Controller('cliente')
export class NegocioController {
    constructor(private negocioService: NegocioService) { }

    @Post('addCliente')
    create(@Body() user: Usuario): string {
        console.log(user)
        return this.negocioService.create(user);
    }

    @Get(':mail')
    public getUsuario(@Param() mail:string): Usuario{
        return this.negocioService.getUsuario(mail);
    }

    // @Post('addVend')
    // addVendor(@Body() vddr: Vendedor): string {
    //     return this.negocioService.addVendedor(vddr);
    // }

}

