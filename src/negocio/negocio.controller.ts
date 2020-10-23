import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Articulo } from './articulo';
import { NegocioService } from './negocio.service';

@Controller('articulo')
export class NegocioController {
    constructor(private negocioService: NegocioService) { }

    @Get(':oper/:index')
    ejecutar(@Param('oper') oper, @Param('index') index): Articulo {
        return this.negocioService.getArticulo(oper, Number(index));
    }

    @Get(':categoria')
    public getArticulosCategoria(@Param('categoria') categoria): Articulo[] {
        return this.negocioService.getArticulosCategoria(categoria);
    }

    @Post()
    create(@Body() user: any): string {
        return   this.negocioService.create(user);
    }

}

