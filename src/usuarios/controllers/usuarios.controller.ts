import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpCode,
    ConflictException,
} from '@nestjs/common';

import { UsuariosService } from '../services/usuarios.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
    ActualizarUsuariosDto,
    CrearUsuariosDto,
    EliminarUsuariosDto,
    IniciarSesionDto,
    ObtenerPorIdUsuariosDto,
} from '../dtos/usuarios.dto';

import { Usuarios } from '../../database/models/usuarios.model';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}

    @ApiOperation({ summary: 'Obtener a todos los Usuarios' })
    @Get('obtener-todos')
    obtenerTodos() {
        return this.usuariosService.obtenerTodos();
    }

    @ApiOperation({ summary: 'Obtener a usuarios segun su clave primaria' })
    @Get('obtener-por-id/:email')
    async obtenerPorId(@Param() email: ObtenerPorIdUsuariosDto) {
        return this.usuariosService.obtenerPorId(email);
    }

    @ApiOperation({ summary: 'Crear usuarios' })
    @Post('crear')
    crear(@Body() usuario: CrearUsuariosDto) {
        return this.usuariosService.crear(usuario);
    }

    @ApiOperation({ summary: 'Actualizar usuarios' })
    @Put('actualizar/:email')
    update(@Body() usuario: ActualizarUsuariosDto) {
        return this.usuariosService.actualizar(usuario);
    }

    @ApiOperation({ summary: 'Eliminar usuario' })
    @Delete('eliminar/:email')
    eliminar(@Param() email: EliminarUsuariosDto) {
        return this.usuariosService.eliminar(email);
    }

    @ApiOperation({ summary: 'Para Iniciar Sesion' })
    @Post('iniciar-sesion')
    @HttpCode(200)
    iniciarSesion(@Body() datos: IniciarSesionDto) {
        return this.usuariosService.iniciarSesion(datos);
    }
}
