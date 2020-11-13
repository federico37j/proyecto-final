import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CarritoService } from './carrito.service';

@Controller('carrito')
export class CarritoController {

    constructor (private carritoService: CarritoService){}

    @Get()
    public getProductos(): string {
        return this.carritoService.getCarrito();
    }

    @Post()
    create(@Body() producto:any): string {
        return this.carritoService.create(producto)
    }

}
