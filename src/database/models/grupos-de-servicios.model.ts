import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    BelongsToMany,
} from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';
import { PropuestaDeServicioServicios } from './propuesta-de-servicio-servicios.model';
import { PropuestasDeServicios } from './propuestas-de-servicios.model';

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

    @BelongsToMany(
        () => PropuestasDeServicios,
        () => PropuestaDeServicioServicios,
    )
    declare propuestaDeServicios: PropuestasDeServicios[];
}

export default GruposDeServicios;
