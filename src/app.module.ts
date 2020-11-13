import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NegocioController } from './negocio/negocio.controller';
import { NegocioService } from './negocio/negocio.service';
import { CarritoController } from './carrito/carrito.controller';
import { CarritoService } from './carrito/carrito.service';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..',
    'client'),
    }),],
  controllers: [AppController, NegocioController, CarritoController],
  providers: [AppService, NegocioService, CarritoService],
})
export class AppModule {}
