import { IsString, IsNotEmpty, Length, IsIn , Matches ,IsNumber,ArrayMinSize, IsArray } from 'class-validator';
import { ApiProperty, PickType, OmitType } from '@nestjs/swagger';
import { ADJUDICADO, Adjudicado } from '../../common/constants/adjudicados.constants';
import { Transform } from 'class-transformer';
import {GruposDeServicios} from '../../database/models/grupos-de-servicios.model';
import SubServicios from 'src/database/models/sub-servicios.model';


export class ActualizarPropuestasDeServiciosDto {
    @IsNumber({}, { message: 'El codigo de la propuesta de servicio debe ser un número' })
    @IsNotEmpty({ message: 'El codigo de la propuesta de servicio está vacio' })
    @ApiProperty({ description: 'Este es el codigo de la propuesta de servicio' })
    readonly codigo: number;

    @IsNumber({}, { message: 'El año de la propuesta de servicio debe ser un número' })
    @IsNotEmpty({ message: 'El año de la propuesta de servicio está vacio' })
    @ApiProperty({ description: 'Este es el año de la propuesta de servicio' })
    readonly año: number;

    @IsNumber({}, { message: 'El pago de la propuesta de servicio debe ser un número' })
    @IsNotEmpty({ message: 'El pago de la propuesta de servicio está vacio' })
    @ApiProperty({ description: 'Este es el pago de la propuesta de servicio' })
    readonly pago: number;
    
    @IsNotEmpty({ message: 'La fecha de la propuesta de servicio está vacia' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe tener el formato YYYY-MM-DD' })
    @ApiProperty({ description: 'Esta es la fecha de la propuesta de servicio' })
    readonly fecha: Date;

    @Length(1, 15, {
        message: 'La longitud del rut de la propuesta de servicio debe ser entre 1 y 15 caracteres',
    })
    @IsString({ message: 'El rut de la propuesta de servicio debe ser texto' })
    @IsNotEmpty({ message: 'El rut de la propuesta de servicio está vacio' })
    @Transform(({ value }: { value: string }): string => value.toUpperCase()) //ToDo: Crear expresion regular para validar rut
    @ApiProperty({ description: 'Este es el rut de la propuesta de servicio' })
    readonly rut_receptor: string;

    @IsIn(Object.values(ADJUDICADO), {
        message: 'El estado debe ser uno de los valores permitidos',
    })
    @Length(1, 2, { message: 'La longitud del adjudicado debe ser entre 1 y 2 caracteres' })
    @IsString( { message: 'El adjudicado debe ser texto' })
    @IsNotEmpty( { message: 'El adjudicado está vacio' })
    @Transform(({ value }) => value.toUpperCase())
    readonly adjudicado: Adjudicado;

    //grupos de servicios
    @IsArray({ message: 'El campo debe ser un arreglo' })
    @ArrayMinSize(1, { message: 'El arreglo debe contener al menos un elemento' })
    @ApiProperty({ description: 'Este es un arreglo de elementos' })
    readonly grupos_de_servicios: Array<{ nombre: string , sub_servicios: SubServicios[] }>;

}

export class CrearPropuestasDeServiciosDto extends OmitType(ActualizarPropuestasDeServiciosDto, [
    'codigo',
    'año',
])  
{}

export class ObtenerPorIdPropuestasDeServiciosDto extends PickType(ActualizarPropuestasDeServiciosDto, [
    'codigo',
    'año',
]){}

export class EliminarPropuestasDeServiciosDto extends PickType(ActualizarPropuestasDeServiciosDto, [
    'codigo',
    'año',
]){}

export class RetornoPropuestaDeServicio extends ActualizarPropuestasDeServiciosDto {}
