import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { EmpresasService } from '../services/empresas.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllers } from '../../common/base/base-controllers.class';
import { ApiRespuestaError, Tipo } from '../../common/utils/decorators';
import { TIPOS_DE_USUARIO } from '../../common/constants/tipos-usuarios.constants';
import { ActualizarEmpresasDto, CrearEmpresasDto, EliminarEmpresasDto } from '../dtos/empresas.dto';

@ApiTags('Empresas')
@Controller('empresas')
export class EmpresasController  {
    constructor(private empresasServicio: EmpresasService) {
        
    }

    @ApiOperation({ summary: 'Crear empresas' })
    @ApiRespuestaError()
    @Tipo(TIPOS_DE_USUARIO.OPCION_1, TIPOS_DE_USUARIO.OPCION_3)
    @Post('crear')
    crear(@Body() empresa: CrearEmpresasDto) {
        return this.empresasServicio.crear(empresa);
    }

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

    @ApiOperation({ summary: 'Actualizar empresas' })
    @ApiRespuestaError()
    @Tipo(TIPOS_DE_USUARIO.OPCION_1, TIPOS_DE_USUARIO.OPCION_3)
    @Put('actualizar')
    actualizar(@Body() empresa: ActualizarEmpresasDto) {
        return this.empresasServicio.actualizar(empresa);
    }

    @ApiOperation({ summary: 'Eliminar empresa' })
    @ApiRespuestaError()
    @Tipo(TIPOS_DE_USUARIO.OPCION_1, TIPOS_DE_USUARIO.OPCION_3)
    @Delete('eliminar/:rut')
    eliminar(@Param() clavePrimaria: EliminarEmpresasDto) {
        return this.empresasServicio.eliminar(clavePrimaria);
    }
}
