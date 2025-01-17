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
import { OrdenesDeTrabajosModule } from './ordenes-de-trabajos/ordenes-de-trabajos.module';
import { GirosModule } from './giros/giros.module';
import { TiposModule } from './tipos/tipos.module';
import { GrupoDeServiciosController } from './carpeta/subcarpeta/grupo_de_servicios.controller';
import { GrupoDeServiciosService } from './carpeta/subcarpeta/grupo_de_servicios.service';
import { GrupoDeServiciosController } from './grupo_de_servicios/controllers/grupo_de_servicios.controller';
import { GrupoDeServiciosService } from './grupo_de_servicios/controllers/grupo_de_servicios.service';
import { GrupoDeServiciosModule } from './grupo_de_servicios/grupo_de_servicios.module';
import { GrupoDeServiciosService } from './grupo_de_servicios/service/grupo_de_servicios.service';
import { SubServiciosService } from './sub_servicios/service/sub_servicios.service';
import { SubServiciosModule } from './sub_servicios/sub_servicios.module';
import { SubServiciosController } from './sub_servicios/controllers/sub_servicios.controller';




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
        OrdenesDeTrabajosModule,
        GirosModule,
        TiposModule,
        GrupoDeServiciosModule,
        SubServiciosModule,

        
    ],
    controllers: [AppController, RegionesController, ProvinciasController, ComunasController, GrupoDeServiciosController, SubServiciosController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: TiposGuard,
        },
        ComunasService,
        RegionesService,
        ProvinciasService,
        GrupoDeServiciosService,
        SubServiciosService,
    ],
})
export class AppModule {}
