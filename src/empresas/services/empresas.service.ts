import { Injectable } from '@nestjs/common';
import { CrearEmpresasDto } from '../dtos/empresas.dto';


@Injectable()
export class EmpresasService {

    async crear(empresa: CrearEmpresasDto) {
        
        return empresa;
    }

}
