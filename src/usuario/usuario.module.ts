import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from 'src/carrito/carrito.entity';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Carrito
    ])
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule { }
