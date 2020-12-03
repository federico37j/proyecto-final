import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { Articulo } from './articulo.entity';

@Controller('articulo')
export class ArticuloController {

    public constructor(private readonly articuloService: ArticuloService) { }

    @Get("get-all")
    public getAllProductos(): Promise<Articulo[]> {
        return this.articuloService.getArticulos();
    }

    @Get(':categoria/:index')
    public getArticuloById(@Param('categoria') categoria, @Param('index') index): Promise<Articulo> {
        return this.articuloService.getArticuloById(categoria, Number(index));
    }

    @Get(':categoria')
    public getArticulosCategoria(@Param('categoria') categoria): Promise<Articulo[]> {
        return this.articuloService.getArticulosCategoria(categoria);
    }

}
