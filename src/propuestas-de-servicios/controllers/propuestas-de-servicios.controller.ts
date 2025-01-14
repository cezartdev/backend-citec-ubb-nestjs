import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';

import { PropuestasDeServiciosService } from '../services/propuestas-de-servicios.service';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
    ActualizarPropuestasDeServiciosDto,
    CrearPropuestasDeServiciosDto,
    EliminarPropuestasDeServiciosDto,
    ObtenerPorIdPropuestasDeServiciosDto,
    RetornoPropuestaDeServicio,
 } from '../dtos/propuestas-de-servicios.dto';

import { ErrorRespuestaDto } from '../../common/dtos/error-respuesta.dto';
import PropuestasDeServicios from '../../database/models/propuestas-de-servicios.model';

@ApiTags('Propuestas de Servicios')
@Controller('propuestas-de-servicios')
export class PropuestasDeServiciosController {
    constructor(
        private propuestasDeServiciosService: PropuestasDeServiciosService,
    ) {}

    @ApiOperation({ summary: 'Obtener a todas las propuestas de servicios' })
    @ApiResponse({
        status: 404,
        description: 'No encontrado',
        type: ErrorRespuestaDto,
    })

    @Get('obtener-todos')       
    obtenerTodos(): Promise<RetornoPropuestaDeServicio[]> {
        return this.propuestasDeServiciosService.obtenerTodos();
    }

    @ApiOperation({ summary: 'Obtener todas las propuestas de servicios eliminadas' })
    @ApiResponse({
        status: 404,
        description: 'No encontrado',
        type: ErrorRespuestaDto,
    })
    @Get('obtener-todos-eliminados')       
    obtenerTodosEliminados(): Promise<RetornoPropuestaDeServicio[]> {
        return this.propuestasDeServiciosService.obtenerTodosEliminados();
    }

    @ApiOperation({ summary: 'Obtener propuesta de servicios por id' })
    @Get('obtener-por-id/:id')
    obtenerPorId(@Param('id') id: number) {
        return this.propuestasDeServiciosService.obtenerPorId({ id });
    }

    @ApiOperation({ summary: 'Crear propuestas de servicios' })
    @Post('crear')
    crear(@Body() propuesta: CrearPropuestasDeServiciosDto) {
        return this.propuestasDeServiciosService.crear(propuesta);
    }

    @ApiOperation({ summary: 'Actualizar propuesta de servicios' })
    @Put('actualizar')
    actualizar(@Body() propuesta: ActualizarPropuestasDeServiciosDto) {
        return this.propuestasDeServiciosService.actualizar(propuesta);
    }

    @ApiOperation({ summary: 'Eliminar propuesta de servicios' })
    @Delete('eliminar/:id')
    eliminar(@Param('id') id: number) {
        return this.propuestasDeServiciosService.eliminar({ id });
    }
}
