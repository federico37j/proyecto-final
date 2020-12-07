import { Module } from '@nestjs/common';
import { ImagenArticuloController } from './imagen-articulo.controller';
import { ImagenArticuloService } from './imagen-articulo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen_articulo } from './imagen-articulo.entity';
import { Articulo } from 'src/articulo/articulo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Imagen_articulo,
      Articulo
    ])
  ],
  controllers: [ImagenArticuloController],
  providers: [ImagenArticuloService]
})
export class ImagenArticuloModule {}
