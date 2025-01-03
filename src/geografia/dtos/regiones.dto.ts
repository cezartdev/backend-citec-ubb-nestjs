import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';



export class ObtenerPorIdRegionesDto {
    @IsNumber({}, { message: 'El id debe ser un número' })
    @IsNotEmpty({ message: 'El id está vacío' })
    @ApiProperty({ description: 'Este es el id de la region' })
    readonly id: number;
}
