import { Module } from '@nestjs/common';
import { GrupoDeServiciosController } from './controllers/grupo_de_servicios.controller';
import { GrupoDeServiciosService } from './service/grupo_de_servicios.service';

@Module({
    controllers: [GrupoDeServiciosController],
    providers: [GrupoDeServiciosService],
    exports: [GrupoDeServiciosService]
})
export class GrupoDeServiciosModule {}
