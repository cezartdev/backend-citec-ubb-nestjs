import { Module } from '@nestjs/common';
import { PropuestasDeServiciosService } from './services/propuestas-de-servicios.service';
import { PropuestasDeServiciosController } from './controllers/propuestas-de-servicios.controller';

@Module({
  providers: [PropuestasDeServiciosService],
  controllers: [PropuestasDeServiciosController]
})
export class PropuestasDeServiciosModule {}