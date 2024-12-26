// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuarios } from 'src/database/models/usuarios.model';

@Injectable()
export class AutenticacionService {
    constructor(private jwtService: JwtService) {}

    // Método para generar el JWT
    async generateToken(usuario: Usuarios) {
        /**
         * Payload del JWT
         */
        const datos = { email: usuario.email, nombre_tipos: usuario.nombre_tipos };

        const token = await this.jwtService.signAsync(datos);

        return token;
    }
}
