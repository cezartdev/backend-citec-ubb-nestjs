import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { EmpresasService } from '../services/empresas.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllers } from '../../common/base/base-controllers.class';
import { ApiRespuestaError, Tipo } from '../../common/utils/decorators';
import { TIPOS_DE_USUARIO } from '../../common/constants/tipos-usuarios.constants';
import { Usuarios } from 'src/database/models/usuarios.model';
import { CrearUsuariosDto } from 'src/usuarios/dtos/usuarios.dto';

@ApiTags('Empresas')
@Controller('empresas')
export class EmpresasController  {
    constructor(private empresasServicio: EmpresasService) {
        
    }

    // @ApiOperation({ summary: 'Crear usuarios' })
    // @ApiRespuestaError()
    // @Tipo(TIPOS_DE_USUARIO.OPCION_1, TIPOS_DE_USUARIO.OPCION_3)
    // @Post('crear')
    // crear(@Body() usuario: CrearUsuariosDto) {
    //     return this.empresasServicio.crear(usuario);
    // }

    // @ApiOperation({ summary: 'Obtener a todos los usuarios' })
    // @ApiRespuestaError()
    // @Tipo(TIPOS_DE_USUARIO.OPCION_1, TIPOS_DE_USUARIO.OPCION_3)
    // @Get('obtener-todos')
    // obtenerTodos(): Promise<Usuarios[]> {
    //     return this.empresasServicio.obtenerTodos();
    // }

    // @ApiOperation({ summary: 'Obtener a todos los usuarios eliminados' })
    // @ApiRespuestaError()
    // @Tipo(TIPOS_DE_USUARIO.OPCION_1, TIPOS_DE_USUARIO.OPCION_3)
    // @Get('obtener-todos-eliminados')
    // obtenerTodosEliminados(): Promise<Usuarios[]> {
    //     return this.empresasServicio.obtenerTodosEliminados();
    // }

    // @ApiOperation({ summary: 'Obtener a usuarios segun su clave primaria' })
    // @ApiRespuestaError()
    // @Tipo(TIPOS_DE_USUARIO.OPCION_1, TIPOS_DE_USUARIO.OPCION_3)
    // @Get('obtener-por-id/:email')
    // obtenerPorId(@Param() email: ObtenerPorIdUsuariosDto) {
    //     return this.empresasServicio.obtenerPorId(email);
    // }

    // @ApiOperation({ summary: 'Actualizar usuarios' })
    // @ApiRespuestaError()
    // @Tipo(TIPOS_DE_USUARIO.OPCION_1, TIPOS_DE_USUARIO.OPCION_3)
    // @Put('actualizar')
    // actualizar(@Body() usuario: ActualizarUsuariosDto) {
    //     return this.empresasServicio.actualizar(usuario);
    // }

    // @ApiOperation({ summary: 'Eliminar usuario' })
    // @ApiRespuestaError()
    // @Tipo(TIPOS_DE_USUARIO.OPCION_1, TIPOS_DE_USUARIO.OPCION_3)
    // @Delete('eliminar/:email')
    // eliminar(@Param() email: EliminarUsuariosDto) {
    //     return this.empresasServicio.eliminar(email);
    // }
}
