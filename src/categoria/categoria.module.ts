import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articulo } from 'src/articulo/articulo.entity';
import { CategoriaController } from './categoria.controller';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Categoria,
      Articulo
    ])
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
