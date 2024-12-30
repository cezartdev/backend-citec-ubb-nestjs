import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    BelongsTo,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    Sequelize,
    AutoIncrement,
    HasOne,
    HasMany
} from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';
import {PropuestasDeServicios} from './propuestas-de-servicios.model';
import {GruposDeServicios} from './grupos-de-servicios.model';

@Table({
    tableName: 'propuesta-de-servicio-servicios',
    timestamps: true,
})  

export class PropuestaDeServicioServicios extends Model<PropuestaDeServicioServicios> {
    @ApiProperty({ type: 'number', default: 100 })
    @PrimaryKey
    @ForeignKey (() => PropuestasDeServicios)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codigo_propuestas_de_servicios: number;

    @BelongsTo(() => PropuestasDeServicios)
    declare codigo: PropuestasDeServicios;

    @ApiProperty({ type: 'number', default: 2024 })
    @PrimaryKey
    @ForeignKey (() => PropuestasDeServicios)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare año_propuestas_de_servicios: number;

    @BelongsTo(() => PropuestasDeServicios)
    declare año: PropuestasDeServicios;


    @ApiProperty({ type: 'string', default: 'EVALUACIÓN TÉCNICA PRESTACIONAL DE VENTANAS' })
    @PrimaryKey
    @ForeignKey (() => GruposDeServicios)
    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    declare nombre_grupos_de_servicios: string;

    @BelongsTo(() => GruposDeServicios)
    declare nombre: GruposDeServicios;

}

export default PropuestaDeServicioServicios;