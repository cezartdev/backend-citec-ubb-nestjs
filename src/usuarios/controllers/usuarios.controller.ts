import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';

import { UsuariosService } from '../services/usuarios.service';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiExtraModels,
    getSchemaPath,
} from '@nestjs/swagger';
import {
    ActualizarUsuariosDto,
    CrearUsuariosDto,
    EliminarUsuariosDto,
    ObtenerPorIdUsuariosDto,
} from '../dtos/usuarios.dto';
import { Tipo } from 'src/common/utils/decorators';
import { TIPOS_DE_USUARIO } from 'src/common/constants/tipos-usuarios.constants';
import { ErrorRespuestaDto } from 'src/common/dto/error-respuesta.dto';
import { OkRespuestaDto } from 'src/common/dto/ok-respuesta.dto';
import Usuarios from 'src/database/models/usuarios.model';

@ApiTags('Usuarios')
@ApiExtraModels(OkRespuestaDto)
@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}

    @ApiOperation({ summary: 'Obtener a todos los Usuarios' })

    @ApiResponse({
        status: 404,
        description: 'No encontrado',
        type: ErrorRespuestaDto,
    })
    // @Tipo(TIPOS_DE_USUARIO.OPCION_1)
    @Get('obtener-todos')
    obtenerTodos(): Promise<Usuarios[]> {
        return this.usuariosService.obtenerTodos();
    }

    @ApiOperation({ summary: 'Obtener a usuarios segun su clave primaria' })
    @Get('obtener-por-id/:email')
    obtenerPorId(@Param() email: ObtenerPorIdUsuariosDto) {
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
}
