import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { ValidadorClaveMiddleware } from './common/middlewares/validador-clave.middleware';
import config from './config';

//En imports se insertan los modulos o carpetas que se van a utilizar
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: enviroments[process.env.NODE_ENV] || '.dev.env',
            load: [config],
            isGlobal: true,
            validationSchema: Joi.object({
                //Aqui se validan las variables de entorno
                API_KEY: Joi.string().required(), //Valida que la variable de entorno API_KEY sea un string y sea requerida
                DATABASE_URL: Joi.string().required(), // Valida que la variable de entorno DATABASE_URL sea un string y sea requerida
            }),
        }),
        DatabaseModule,
        UsuariosModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidadorClaveMiddleware) // Aplica el middleware
            .forRoutes('*'); // Aplica el middleware a las rutas que empiezan con /api/:key
    }
}
