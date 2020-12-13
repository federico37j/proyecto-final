import { Controller } from '@nestjs/common';
import { Get, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CarritoService } from './carrito.service';

@Controller('carrito')
export class CarritoController {
    
    constructor(private carritoService: CarritoService) { }

    @Get()
    public getProductos(): string {
        return this.carritoService.getCarrito();
    }

    @Post()
    create(@Body() producto: any): string {
        return this.carritoService.create(producto)
    }

    @Delete()
    public vaciarCarrito(): boolean {
        return this.carritoService.vaciarCarrito();
    }

    @Delete(':index')
    public deleteProducto(@Param('index') index): boolean {
        
        return this.carritoService.deleteProducto(parseInt(index));

    }

    @Put(':index')
    public updateProducto(@Body() operacion: any, @Param('index') index): boolean {
        return this.carritoService.updateCantidad(operacion,parseInt(index));
    }

}
