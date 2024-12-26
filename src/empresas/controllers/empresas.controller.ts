import { Controller, Get } from '@nestjs/common';
import { EmpresasService } from '../services/empresas.service';
import { ApiTags } from '@nestjs/swagger';
import { Tipo } from 'src/common/utils/decorators';

@ApiTags('Empresas')
@Controller('empresas')
export class EmpresasController {
    constructor(private empresasServicio: EmpresasService) {}

    @Get('obtener-todos')
    obtenerTodos(): string {
        return '';
    }
    
    @Get('obtener-por-id')
    obtenerPorId(): string {
        return '';
    }
}
