import { Module } from '@nestjs/common';
import { SubServiciosController } from './controllers/sub_servicios.controller';
import { SubServiciosService } from './service/sub_servicios.service';

@Module({
    controllers: [SubServiciosController],
    providers: [SubServiciosService],
    exports: [SubServiciosService]
})
export class SubServiciosModule {}
