import { Controller, Get, Param } from '@nestjs/common';
import { RegionesService } from '../services/regiones.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiRespuestaError } from '../../common/utils/decorators';
import { Regiones } from '../../database/models/regiones.model';
import { BaseControllersSimple } from '../../common/base/base-controllers-simple-class';
import { ObtenerPorIdRegionesDto } from '../dtos/regiones.dto';

@Controller('regiones')
export class RegionesController extends BaseControllersSimple {
    constructor(private readonly regionesService: RegionesService) {
        super();
    }
    
    @ApiOperation({ summary: 'Obtener a todos las regiones' })
    @ApiRespuestaError()
    @Get('obtener-todos')
    obtenerTodos(): Promise<Regiones[]> {
        return this.regionesService.obtenerTodos();
    }

    @ApiOperation({ summary: 'Obtener una region segun su clave primaria' })
    @ApiRespuestaError()
    @Get('obtener-por-id/:id')
    obtenerPorId(@Param() id: ObtenerPorIdRegionesDto) {
        return this.regionesService.obtenerPorId(id);
    }


}
