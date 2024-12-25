import { IsString, IsNotEmpty, IsEmail, Length, IsIn } from 'class-validator';
import { PartialType, ApiProperty, PickType } from '@nestjs/swagger';
import { ESTADOS, Estados } from 'src/common/constants/estados.constants';
import { Transform } from 'class-transformer';
import { toCapitalizeCase } from 'src/common/utils/capitalize';
import { TIPOS_DE_USUARIO, TiposDeUsuario } from 'src/common/constants/tipos-usuarios.constants';

export class IniciarSesionDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Este es el email del usuario' })
    readonly email: string;

    @Length(1, 250)
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Este es la contraseña del usuario' })
    readonly contraseña: string;
}

export class CrearUsuariosDto {
    @Length(1, 70, {
        message: 'La longitud del email debe ser entre 1 y 70 caracteres',
    })
    @IsEmail({}, { message: 'El email debe ser un email valido' })
    @IsString({ message: 'El email debe ser texto' })
    @IsNotEmpty({ message: 'El email esta vacio' })
    @Transform(({ value }: { value: string }): string => value.toLowerCase())
    @ApiProperty({ description: 'Este es el email del usuario' })
    readonly email: string;

    @Length(1, 50, {
        message: 'La longitud del nombre debe ser entre 1 y 50 caracteres',
    })
    @IsString({ message: 'El nombre debe ser una palabra' })
    @IsNotEmpty({ message: 'El nombre esta vacio' })
    @Transform(({ value }: { value: string }): string =>
        toCapitalizeCase(value),
    )
    @ApiProperty({
        description: 'Este es el nombre del usuario',
        default: 'Juan',
    })
    readonly nombre: string;

    @Length(1, 50)
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }): string =>
        toCapitalizeCase(value),
    )
    @ApiProperty({ description: 'Este es el apellido', default: 'Perez' })
    readonly apellido: string;

    @Length(1, 250)
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Este es el apellido',
        default: '$_i;3%z2hpNJM!C4X',
    })
    readonly contraseña: string;

    @IsIn(Object.values(ESTADOS), {
        message: 'El estado debe ser uno de los valores permitidos',
    })
    @Length(1, 250)
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    readonly estado: Estados;

    @IsIn(Object.values(TIPOS_DE_USUARIO), {
        message: 'El nombre del tipo debe ser uno de los valores permitidos',
    })
    @Length(1, 30)
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    readonly nombre_tipos: TiposDeUsuario;
}

export class ObtenerPorIdUsuariosDto extends PickType(CrearUsuariosDto, [
    'email',
]) {}
export class ActualizarUsuariosDto extends PartialType(CrearUsuariosDto) {}

export class EliminarUsuariosDto extends PickType(CrearUsuariosDto, [
    'email',
]) {}
