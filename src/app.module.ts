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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticuloModule } from './articulo/articulo.module';
import { ImagenArticuloModule } from './imagen-articulo/imagen-articulo.module';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..',
    'client'),
    }),TypeOrmModule.forRoot(), ArticuloModule, ImagenArticuloModule],

  controllers: [AppController, NegocioController, StockController, LoginController, CarritoController],
  providers: [AppService, NegocioService, StockService, LoginService, CarritoService],

})
export class AppModule {}
