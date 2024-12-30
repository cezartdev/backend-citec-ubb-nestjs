import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
    ActualizarUsuariosDto,
    CrearUsuariosDto,
    EliminarUsuariosDto,
    ObtenerPorIdUsuariosDto,
} from '../dtos/usuarios.dto';
import Usuarios from 'src/database/models/usuarios.model';

import { UsuariosService } from '../services/usuarios.service';
import { ApiRespuestaError } from 'src/common/utils/decorators';
import { BaseControllers } from 'src/common/base/base-controllers.class';
import { Tipo } from 'src/common/utils/decorators';
import { TIPOS_DE_USUARIO } from 'src/common/constants/tipos-usuarios.constants';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController extends BaseControllers {
    constructor(private usuariosService: UsuariosService) {
        super();
    }

    @ApiOperation({ summary: 'Crear usuarios' })
    @Post('crear')
    crear(@Body() usuario: CrearUsuariosDto) {
        return this.usuariosService.crear(usuario);
    }

    @ApiOperation({ summary: 'Obtener a todos los usuarios' })
    @ApiRespuestaError()
    @Tipo(TIPOS_DE_USUARIO.OPCION_1)
    @Get('obtener-todos')
    obtenerTodos(): Promise<Usuarios[]> {
        return this.usuariosService.obtenerTodos();
    }

    @ApiOperation({ summary: 'Obtener a usuarios segun su clave primaria' })
    @Get('obtener-por-id/:email')
    obtenerPorId(@Param() email: ObtenerPorIdUsuariosDto) {
        return this.usuariosService.obtenerPorId(email);
    }

    @ApiOperation({ summary: 'Actualizar usuarios' })
    @Put('actualizar/:email')
    actualizar(@Body() usuario: ActualizarUsuariosDto) {
        return this.usuariosService.actualizar(usuario);
    }

    @ApiOperation({ summary: 'Eliminar usuario' })
    @Delete('eliminar/:email')
    eliminar(@Param() email: EliminarUsuariosDto) {
        return this.usuariosService.eliminar(email);
    }
}
