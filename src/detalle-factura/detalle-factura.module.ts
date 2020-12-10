import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from 'src/factura/factura.entity';
import { DetalleFacturaController } from './detalle-factura.controller';
import { Detalle_factura } from './detalle-factura.entity';
import { DetalleFacturaService } from './detalle-factura.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Detalle_factura,
      Factura
    ])
  ],
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService]
})
export class DetalleFacturaModule {}
