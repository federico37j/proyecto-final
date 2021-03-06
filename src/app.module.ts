import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NegocioController } from './negocio/negocio.controller';
import { NegocioService } from './negocio/negocio.service';
import { CarritoController } from './carrito/carrito.controller';
import { CarritoService } from './carrito/carrito.service';
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { FacturaController } from './factura/factura.controller';
import { FacturaService } from './factura/factura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { ArticuloModule } from './articulo/articulo.module';
import { ImagenArticuloModule } from './imagen-articulo/imagen-articulo.module';

import { FacturaModule } from './factura/factura.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';

import { LocalModule } from './local/local.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CarritoModule } from './carrito/carrito.module';



@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..',
    'client'),

    }),TypeOrmModule.forRoot(), UsuarioModule, ArticuloModule, ImagenArticuloModule, LocalModule, CategoriaModule, FacturaModule, DetalleFacturaModule, CarritoModule],


  controllers: [AppController],
  providers: [AppService],
  // controllers: [AppController, NegocioController, StockController, LoginController, CarritoController],
  // providers: [AppService, NegocioService, StockService, LoginService, CarritoService],

})
export class AppModule {}
