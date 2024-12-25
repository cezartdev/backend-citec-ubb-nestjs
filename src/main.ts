import { NestFactory } from '@nestjs/core';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            // forbidNonWhitelisted: true,
        }),
    );

    /**
     * Indicar el prefijo de la API
     * Todas las rutas comienzan con /api/:key
     * Y tienen clave de acceso
     */
    app.setGlobalPrefix('api/:key');

    /**
     * Manejo de problemas de CORS
     */
    app.enableCors({
        origin: (origin, callback) => {
            const whitelist = [process.env.FRONTEND_URL];
            console.log(origin);
            if(!origin){
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
    const config = new DocumentBuilder()
        .setTitle('Rest Api Backend')
        .setDescription('Esta es la documentacionb de la API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/:key/docs', app, document);
    await app.listen(4000);
}
bootstrap();
