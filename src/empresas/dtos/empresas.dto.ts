import { IsString, IsNotEmpty, IsEmail, Length, IsIn, Matches, IsAlphanumeric } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { ESTADOS, Estados } from '../../common/constants/estados.constants';
import { Transform } from 'class-transformer';
import { toCapitalizeCase } from '../../common/utils/capitalize';
import {
    TIPOS_DE_USUARIO,
    TiposDeUsuario,
} from '../../common/constants/tipos-usuarios.constants';






export class ActualizarEmpresasDto {



    
}