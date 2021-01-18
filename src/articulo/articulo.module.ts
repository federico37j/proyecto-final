import { Module } from '@nestjs/common';
import { ArticuloController } from './articulo.controller';
import { ArticuloService } from './articulo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articulo } from './articulo.entity';
import { Imagen_articulo } from 'src/imagen-articulo/imagen-articulo.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { Detalle_factura } from 'src/detalle-factura/detalle-factura.entity';
import { Carrito } from 'src/carrito/carrito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Articulo,
      Imagen_articulo,
      Categoria,
      Detalle_factura,
      Carrito
    ])
  ],
  controllers: [ArticuloController],
  providers: [ArticuloService]
})
export class ArticuloModule { }
