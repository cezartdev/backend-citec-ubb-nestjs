import { Module } from '@nestjs/common';
import { AutenticacionService } from './services/autenticacion.service';
import { JwtModule } from '@nestjs/jwt';
import { AutenticacionController } from './controllers/autenticacion.controller';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './guards/jwt/jwt.strategy';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('config.jwt.secret'), // Accede a JWT_SECRET desde la configuración
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AutenticacionService, UsuariosService, JwtStrategy],
    controllers: [AutenticacionController],
})
export class AutenticacionModule {}