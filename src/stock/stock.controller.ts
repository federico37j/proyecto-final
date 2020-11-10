import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { Delete, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Articulo } from 'src/negocio/articulo';

@Controller('stock')
export class StockController {
    constructor(private stockService: StockService) { }

    @Get(':oper/:index')
    ejecutar(@Param('oper') oper, @Param('index') index): Articulo {
        return this.stockService.getArticulo(oper, Number(index));
    }

    @Get(':categoria')
    public getArticulosCategoria(@Param('categoria') categoria): Articulo[] {
        return this.stockService.getArticulosCategoria(categoria);
    }

    @Put(':categoria/:index')
    public updateArticulo(@Body() art: any, @Param('categoria') categoria, @Param('index') index): boolean {
        return this.stockService.updateArticulo(art, categoria, Number(index));
    }

    @Delete(':categoria/:index')
    public deleteProducto(@Param('categoria') categoria, @Param('index') index): boolean {
        return this.stockService.deleteArticulo(categoria, Number(index));
    }

    @Post(':categoria')
    addArticulo(@Body() articulo: Articulo, @Param('categoria') categoria): string {
        return this.stockService.addArticulo(articulo, categoria);
    }

}
