import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle_factura } from 'src/detalle-factura/detalle-factura.entity';
import { FacturaController } from './factura.controller';
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([
        Factura,
        Detalle_factura
      ])
    ],
    controllers: [FacturaController],
    providers: [FacturaService]
  })
export class FacturaModule {}
