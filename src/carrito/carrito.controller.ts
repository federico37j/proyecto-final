import { Controller } from '@nestjs/common';
import { Get, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Carrito } from './carrito.entity';
import { CarritoService } from './carrito.service';

@Controller('carrito')
export class CarritoController {

    constructor(private carritoService: CarritoService) { }

    @Get(':idUsuario')
    public getProductos(@Param('idUsuario') idUsuario): Promise<Carrito[]> {
        return this.carritoService.getCarritoByIdUsuario(idUsuario);
    }

    // @Post()
    // create(@Body() producto: any): string {
    //     return this.carritoService.create(producto)
    // }

    @Post(':idUsuario/:idArticulo')
    public addArticuloCarrito(@Param('idUsuario') idUsuario, @Param('idArticulo') idArticulo) {
        return this.carritoService.addArticuloCarrito(idUsuario, idArticulo);
    }

    @Delete('vaciar/:idUsuario')
    public vaciarCarrito(@Param('idUsuario') idUsuario) {
        return this.carritoService.vaciarCarrito(Number(idUsuario));
    }

    @Delete(':idCarrito')
    public deleteProducto(@Param('idCarrito') idCarrito) {
        return this.carritoService.deleteProducto(Number(idCarrito));
    }

    @Put(':index')
    public updateCantidadProducto(@Body() operacion: any, @Param('index') index): Promise<Carrito> {
        return this.carritoService.updateCantidad(operacion, parseInt(index));
    }

}
