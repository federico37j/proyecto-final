import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { Articulo } from './articulo.entity';
import { Imagen_articulo } from 'src/imagen-articulo/imagen-articulo.entity';

@Controller('articulo')
export class ArticuloController {

    public constructor(private readonly articuloService: ArticuloService) { }

    @Get('get-all')
    public getAllProductos(): Promise<Articulo[]> {
        return this.articuloService.getArticulos();
    }

    @Get(':categoria/:id')
    public getArticuloById(@Param('categoria') categoria, @Param('id') id): Promise<Articulo> {
        return this.articuloService.getArticuloById(Number(id));
    }

    // @Get(':index')
    // public getImgByIdArticulo(@Param('index') index): Promise<Imagen_articulo[]> {
    //     return this.articuloService.getImagenesByIdArticulo(Number(index));
    // }

    @Get(':categoria')
    public getArticulosCategoria(@Param('categoria') categoria): Promise<Articulo[]> {
        return this.articuloService.getArticulosCategoria(categoria);
    }

    @Post(':categoria')
    public addArticulo(@Body() articulo: Articulo, @Param('categoria') categoria): Promise<Articulo> {
        return this.articuloService.addArticulo(articulo, categoria);
    }

     // @Post('addImagen')
    // public addImagen(@Body() img: Imagen_articulo): Promise<Imagen_articulo> {
    //     return this.articuloService.addImagen(img);
    // }

    @Put(':categoria/:id')
    public updateArticulo(@Body() art: any, @Param('categoria') categoria, @Param('id') index): Promise<Articulo> {
        return this.articuloService.updateArticulo(art, categoria, Number(index));
    }

    @Put(':id')
    public updateStock(@Body() art: any, @Param('id') index): Promise<Articulo> {
        return this.articuloService.updateStock(art, Number(index));
    }

    // @Put(':id')
    // public updateImagen(@Body() art: any, @Param('id') index) {
    //     return this.articuloService.updateImagen(art, Number(index));
    // }

    @Delete(':id')
    public deleteArticulo(@Param ('id') id) {
        return this.articuloService.deleteArticulo(id);
    }

    // @Delete(':id')
    // public deleteArticulo(@Param ('id') id) {
    //     return this.articuloService.deleteImagenes(id);
    // }
}
