import { IsString, IsNotEmpty, Length, IsIn  ,IsNumber, IsDate } from 'class-validator';
import { ApiProperty, PickType, OmitType } from '@nestjs/swagger';
import { ESTADOS, Estados } from 'src/common/constants/estados.constants';
import { ADJUDICADO, Adjudicado } from 'src/common/constants/adjudicados.constants';
import { Transform } from 'class-transformer';

export class ActualizarPropuestasDeServiciosDto {
    @IsNumber({}, { message: 'El codigo de la propuesta de servicio debe ser un número' })
    @IsNotEmpty({ message: 'El codigo de la propuesta de servicio está vacio' })
    @ApiProperty({ description: 'Este es el codigo de la propuesta de servicio' })
    readonly codigo: number;

    @Length(4, 4, {
        message: 'La longitud del año de la propuesta de servicio debe ser de 4 caracteres',
    })
    @IsNumber({}, { message: 'El año de la propuesta de servicio debe ser un número' })
    @IsNotEmpty({ message: 'El año de la propuesta de servicio está vacio' })
    @ApiProperty({ description: 'Este es el año de la propuesta de servicio' })
    readonly año: number;

    @Length (1,6, {
        message: 'La longitud del pago de la propuesta de servicio debe ser de 1 a 6 caracteres',
    })
    @IsNumber({}, { message: 'El pago de la propuesta de servicio debe ser un número' })
    @IsNotEmpty({ message: 'El pago de la propuesta de servicio está vacio' })
    @ApiProperty({ description: 'Este es el pago de la propuesta de servicio' })
    readonly pago: number;

    @IsDate( {message: 'La fecha de la propuesta de servicio debe ser una fecha valida' })
    @IsNotEmpty({ message: 'La fecha de la propuesta de servicio está vacia' })
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


    @IsIn(Object.values(ESTADOS), {
        message: 'El estado debe ser uno de los valores permitidos',
    })
    @Length(1, 10,{ message: 'La longitud del estado debe ser entre 1 y 10 caracteres'})  
    @IsString( { message: 'El estado debe ser texto' }) 
    @IsNotEmpty( { message: 'El estado está vacio' })
    @Transform(({ value }) => value.toUpperCase())
    @ApiProperty({ description: 'Este es el estado de la propuesta de servicio' })
    readonly estado: Estados;


    @IsIn(Object.values(ADJUDICADO), {
        message: 'El estado debe ser uno de los valores permitidos',
    })
    @Length(1, 2, { message: 'La longitud del adjudicado debe ser entre 1 y 2 caracteres' })
    @IsString( { message: 'El adjudicado debe ser texto' })
    @IsNotEmpty( { message: 'El adjudicado está vacio' })
    @Transform(({ value }) => value.toUpperCase())
    readonly adjudicado: Adjudicado;
}

export class CrearPropuestasDeServiciosDto extends OmitType(ActualizarPropuestasDeServiciosDto, [
    'codigo',
    'año',
])  
{}

export class ObtenerPropuestasDeServiciosDto extends PickType(ActualizarPropuestasDeServiciosDto, [
    'codigo',
    'año',
]){}

export class EliminarPropuestasDeServiciosDto extends PickType(ActualizarPropuestasDeServiciosDto, [
    'codigo',
    'año',
]){}