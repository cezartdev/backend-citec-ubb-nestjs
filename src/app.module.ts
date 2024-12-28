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
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: TiposGuard,
        },
    ],
})
export class AppModule {}
