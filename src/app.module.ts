import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { AutenticacionModule } from './auth/autenticacion.module';
import { APP_GUARD } from '@nestjs/core';
import config from './config';
import { TiposGuard } from './auth/guards/tipos/tipos.guard';
import { EmpresasModule } from './empresas/empresas.module';
import { PropuestasDeServiciosModule } from './propuestas-de-servicios/propuestas-de-servicios.module';
import { RegionesController } from './geografia/controllers/regiones.controller';
import { ProvinciasController } from './geografia/controllers/provincias.controller';
import { ComunasController } from './geografia/controllers/comunas.controller';
import { ComunasService } from './geografia/services/comunas.service';
import { RegionesService } from './geografia/services/regiones.service';
import { ProvinciasService } from './geografia/services/provincias.service';
import { GeografiaModule } from './geografia/geografia.module';



//En imports se insertan los modulos o carpetas que se van a utilizar
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: enviroments.dev,
            load: [config],
            isGlobal: true,
            validationSchema: Joi.object({
                //Aqui se validan las variables de entorno
                DATABASE_URL: Joi.string().required(),
                FRONTEND_URL: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                DESARROLLADOR_PASS: Joi.string().required(),
            }),
        }),
        DatabaseModule,
        UsuariosModule,
        AutenticacionModule,
        EmpresasModule,
        PropuestasDeServiciosModule,
        GeografiaModule,
        
    ],
    controllers: [AppController, RegionesController, ProvinciasController, ComunasController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: TiposGuard,
        },
        ComunasService,
        RegionesService,
        ProvinciasService,
    ],
})
export class AppModule {}
