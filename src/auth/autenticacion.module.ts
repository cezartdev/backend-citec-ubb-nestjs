import { Module } from '@nestjs/common';
import { AutenticacionService } from './services/autenticacion.service';
import { JwtModule } from '@nestjs/jwt';
import { AutenticacionController } from './controllers/autenticacion.controller';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';

import { JwtStrategy } from './guards/jwt/jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT, // Se recomienda usar una clave secreta más segura y no hardcodeada
            signOptions: { expiresIn: '60m' }, // Expiración del token
        }),
    ],
    providers: [AutenticacionService, UsuariosService, JwtStrategy],
    controllers: [AutenticacionController],
})
export class AutenticacionModule {}
