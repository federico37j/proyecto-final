import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NegocioController } from './negocio/negocio.controller';
import { NegocioService } from './negocio/negocio.service';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..',
    'client'),
    }),],
  controllers: [AppController, NegocioController],
  providers: [AppService, NegocioService],
})
export class AppModule {}
