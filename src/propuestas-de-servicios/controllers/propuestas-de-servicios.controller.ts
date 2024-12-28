import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiExtraModels,
    getSchemaPath,
} from '@nestjs/swagger';

import { ErrorRespuestaDto } from 'src/common/dto/error-respuesta.dto';

@ApiTags('Propuestas de Servicios')
@Controller('propuestas-de-servicios')
export class PropuestasDeServiciosController {

    
}
