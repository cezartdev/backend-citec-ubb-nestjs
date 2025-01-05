import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
} from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';


@Table({
    tableName: 'grupos_de_servicios',
    timestamps: true,
})
export class GruposDeServicios extends Model<GruposDeServicios> {
    @ApiProperty({
        type: 'string',
        default: 'EVALUACIÓN TÉCNICA PRESTACIONAL DE VENTANAS',
    })
    @PrimaryKey
    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    declare nombre: string;

}

export default GruposDeServicios;
