import {
    Injectable,
    NotFoundException,
    ConflictException,
    ForbiddenException,
} from '@nestjs/common';

import { PropuestasDeServicios } from 'src/database/models/propuestas-de-servicios.model';



@Injectable()
export class PropuestasDeServiciosService {}
