import { NestFactory } from '@nestjs/core';
import {
    ForbiddenException,
    ValidationPipe,
    BadRequestException,
    ValidationError,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors: ValidationError[]) => {
                const messages = errors.flatMap((err) => {
                    const constraints = Object.values(err.constraints || {});
                    const customMessages = constraints.map((constraint) => {
                        if (constraint.includes('should not exist')) {
                            return `La propiedad '${err.property}' no debería existir`;
                        }
                        return constraint.replace('property', `La propiedad '${err.property}'`);
                    });
                    return customMessages;
                });
                return new BadRequestException(messages);
            },
            transform: true,
        }),
    );


    /**
     * Indicar el prefijo de la API
     * Todas las rutas comienzan con /api/:clave
     * Y tienen clave de acceso
     */
    app.setGlobalPrefix('api/:clave');

    /**
     * Manejo de problemas de CORS
     */
    app.enableCors({
        origin: (origin, callback) => {
            const whitelist = [process.env.FRONTEND_URL];
            console.log(origin);
            if (!origin) {
                callback(null, true);
                return;
            }
            if (!whitelist.includes(origin)) {
                callback(
                    new ForbiddenException('No permitido por CORS'),
                    false,
                );
                return;
            }

            callback(null, true);
        },
        methods: 'GET,PUT,POST,DELETE',
        credentials: true,
    });

    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.set('trust proxy', true); // Configurar trust proxy

    /**
     * Titulo de la API
     * Descripcion de la API
     */
    const titulo = '(REST API) Documentacion backend para proyecto Citec UBB';
    const descripcion =
        'Se usan las siguientes tecnologias:\n' +
        '- NestJS\n\n' +
        '- TypeScript\n\n' +
        '- NodeJS\n\n' +
        '- Sequelize ORM (Mysql)';
    const config = new DocumentBuilder()
        .setTitle(titulo)
        .setDescription(descripcion)
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/:clave/docs', app, document);
    await app.listen(4000);
}
bootstrap();
