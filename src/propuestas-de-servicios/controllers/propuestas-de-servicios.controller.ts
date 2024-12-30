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

import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiExtraModels,
    getSchemaPath,
} from '@nestjs/swagger';

import { 
    ActualizarPropuestasDeServiciosDto,
    CrearPropuestasDeServiciosDto,
    EliminarPropuestasDeServiciosDto,
    ObtenerPorIdPropuestasDeServiciosDto,
 } from '../dtos/propuestas-de-servicios.dto';


import { ErrorRespuestaDto } from 'src/common/dto/error-respuesta.dto';
import { OkRespuestaDto } from 'src/common/dto/ok-respuesta.dto';
import PropuestasDeServicios from 'src/database/models/propuestas-de-servicios.model';

@ApiTags('Propuestas de Servicios')
@ApiExtraModels(OkRespuestaDto)
@Controller('propuestas-de-servicios')
export class PropuestasDeServiciosController {
    constructor(private propuestasDeServiciosService: PropuestasDeServiciosService) {}

    @ApiOperation({ summary: 'Obtener a todas las propuestas de servicios' })

    @ApiResponse({ 
        status: 404, 
        description: 'No encontrado', 
        type: ErrorRespuestaDto 
    })

    @Get('obtener-todos')       
    obtenerTodos(): Promise<PropuestasDeServicios[]> {
        return this.propuestasDeServiciosService.obtenerTodos();
    }

    @Get('obtener-todos-eliminados')
    obtenerTodosEliminados(): Promise<PropuestasDeServicios[]> {
        return this.propuestasDeServiciosService.obtenerTodosEliminados();
    }

    @ApiOperation({ summary: 'Obtener a propuestas de servicios segun su clave primaria' }) 
    @Get('obtener-por-id/:codigo/:año')    
    obtenerPorId(@Param() clavePrimaria: ObtenerPorIdPropuestasDeServiciosDto) {
        return this.propuestasDeServiciosService.obtenerPorId(clavePrimaria);
    }

    @ApiOperation({ summary: 'Crear propuestas de servicios' })
    @Post('crear')
    crear(@Body() propuesta: CrearPropuestasDeServiciosDto) {
        return this.propuestasDeServiciosService.crear(propuesta);
    }

    @ApiOperation({ summary: 'Actualizar propuestas de servicios' })
    @Put('actualizar')
    actualizar(@Body() propuesta: ActualizarPropuestasDeServiciosDto) {
        return this.propuestasDeServiciosService.actualizar(propuesta);
    }

    @ApiOperation({ summary: 'Eliminar propuestas de servicios' })
    @Delete('eliminar')
    eliminar(@Body() clavePrimaria: EliminarPropuestasDeServiciosDto) {
        return this.propuestasDeServiciosService.eliminar(clavePrimaria);
    }

    
}
