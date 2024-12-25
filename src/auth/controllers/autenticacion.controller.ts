import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { AutenticacionService } from '../services/autenticacion.service';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';
import { IniciarSesionDto } from 'src/usuarios/dtos/usuarios.dto';

@Controller('autenticacion')
export class AutenticacionController {
    constructor(
        private autenticacionService: AutenticacionService,
        private usuarioServicio: UsuariosService,
    ) {}

    //Inicio de sesion del usuario
    @Post('iniciar-sesion')
    async login(@Body() iniciarSesion: IniciarSesionDto) {
        const usuario = await this.usuarioServicio.iniciarSesion(iniciarSesion);

        if (!usuario) {
            throw new ForbiddenException('Usuario o contraseña incorrecta');
        }
        return this.autenticacionService.generateToken(usuario);
    }
}
