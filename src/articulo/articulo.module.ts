import { Module } from '@nestjs/common';
import { ArticuloController } from './articulo.controller';
import { ArticuloService } from './articulo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articulo } from './articulo.entity';
import { Imagen_articulo } from 'src/imagen-articulo/imagen-articulo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Articulo,
      Imagen_articulo
    ])
  ],
  controllers: [ArticuloController],
  providers: [ArticuloService]
})
export class ArticuloModule { }
