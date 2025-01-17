import { IsString, IsNotEmpty, Length, IsIn, Matches, IsNumber, ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, PickType, OmitType } from '@nestjs/swagger';
import { ADJUDICADO, Adjudicado } from '../../common/constants/adjudicados.constants';
import { ESTADOS, Estados } from '../../common/constants/estados.constants';
import { Transform, Type } from 'class-transformer';
import { toCapitalizeCase } from '../../common/utils/capitalize';

export class ActualizarPropuestasDeServiciosDto {
    @IsNumber({}, { message: 'El id de la orden de trabajo debe ser un número' })
    @IsNotEmpty({ message: 'El id de la orden de trabajo está vacio' })
    @ApiProperty({ description: 'Este es el id de la orden de trabajo' })
    readonly id: number;

    @IsNumber({}, { message: 'El año de la orden de trabajo debe ser un número' })
    @IsNotEmpty({ message: 'El año de la orden de trabajo está vacio' })
    @ApiProperty({ description: 'Este es el año de la orden de trabajo' })
    readonly año: number;

    @IsNotEmpty({ message: 'La fecha de solicitud de la orden de trabajo está vacia' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha de solicitud debe tener el formato YYYY-MM-DD' })
    @ApiProperty({ description: 'Esta es la fecha de solicitud de la orden de trabajo' })
    readonly fecha_solicitud: Date;

    @Length(1, 30, {
        message: 'La longitud del nombre del solicitante de la orden de trabajo debe ser entre 1 y 30 caracteres',
    })
    @IsString({ message: 'El nombre del solicitante de la orden de trabajo debe ser texto' })
    @IsNotEmpty({ message: 'El rut de la orden de trabajo está vacio' })
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return toCapitalizeCase(value);
    })
    @ApiProperty({ description: 'Este es el nombre del solicitante de la orden de trabajo' })
    readonly nombre_solicitante: string;
    
    @IsNotEmpty({ message: 'La fecha de la orden de trabajo está vacia' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe tener el formato YYYY-MM-DD' })
    @ApiProperty({ description: 'Esta es la fecha de la orden de trabajo' })
    readonly fecha_entrega: Date;

    @Length(1, 300, {
        message: 'La longitud de la observacion debe ser entre 1 y 300 caracteres',
    })
    @IsString({ message: 'La observacion debe ser texto' })
    @IsNotEmpty({ message: 'La observacion está vacia' })
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.toLowerCase();
    })
    @ApiProperty({ description: 'Este es la observacion de la orden de trabajo' })
    readonly observacion: string;

    @Length(1, 150, {
        message: 'La longitud de la direccion debe ser entre 1 y 150 caracteres',
    })
    @IsString({ message: 'La direccion debe ser texto' })
    @IsNotEmpty({ message: 'La direccion está vacia' })
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return toCapitalizeCase(value);
    })
    @ApiProperty({ description: 'Este es la direccion de la orden de trabajo' })
    readonly direccion: string;

    @IsNumber({}, { message: 'El id de la comuna debe ser un número' })
    @IsNotEmpty({ message: 'El id de la comuna está vacia' })
    @ApiProperty({ description: 'Este es el id de la comuna de la orden de trabajo' })
    readonly id_comunas: number;

    @IsNumber({}, { message: 'El id de la propuesta de servicio debe ser un número' })
    @IsNotEmpty({ message: 'El id de la propuesta de servicio está vacia' })
    @ApiProperty({ description: 'Este es el id de la comuna de la orden de trabajo' })
    readonly id_propuesta_de_servicio: number;

    @IsNumber({}, { message: 'El id del pago debe ser un número' })
    @IsNotEmpty({ message: 'El id del pago está vacio' })
    @ApiProperty({ description: 'Este es el id del pago de la propuesta de servicios' })
    readonly id_pagos: number;
}

export class CrearPropuestasDeServiciosDto extends OmitType(ActualizarPropuestasDeServiciosDto , [
    'id',
    'año'
]){}

// export class ObtenerPorIdPropuestasDeServiciosDto extends PickType(ActualizarPropuestasDeServiciosDto, [
//     'id',
// ]){}

// export class EliminarPropuestasDeServiciosDto extends PickType(ActualizarPropuestasDeServiciosDto, [
//     'id',
// ]){}

// export class RetornoPropuestaDeServicio extends OmitType(ActualizarPropuestasDeServiciosDto, []) {

//     @ApiProperty({
//         description: 'Este es el estado de la propuesta de servicio',
//         enum: ESTADOS
//     })
//     readonly estado: Estados;

//     @ApiProperty({
//         description: 'Este es el rut de la empresa',
//         type: () => RetornoEmpresasDto
//     })
//     @ValidateNested()
//     @Type(() => RetornoEmpresasDto)
//     readonly empresa: RetornoEmpresasDto;
    
// }
