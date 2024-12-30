import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { PropuestasDeServicios } from './propuestas-de-servicios.model';
import { GruposDeServicios } from './grupos-de-servicios.model';

@Table({
    tableName: 'propuesta_de_servicio_servicios',
    timestamps: true,
})
export class PropuestaDeServicioServicios extends Model<PropuestaDeServicioServicios> {
    @ApiProperty({ type: 'number', default: 100 })
    @PrimaryKey
    @ForeignKey(() => PropuestasDeServicios) // Relación con PropuestasDeServicios
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codigo: number;

    @ApiProperty({ type: 'number', default: 2024 })
    @PrimaryKey
    @ForeignKey(() => PropuestasDeServicios) // Relación con PropuestasDeServicios
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare año: number;

    @ApiProperty({
        type: 'string',
        default: 'EVALUACIÓN TÉCNICA PRESTACIONAL DE VENTANAS',
    })
    @PrimaryKey
    @ForeignKey(() => GruposDeServicios) // Relación con GruposDeServicios
    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    declare nombre: string;

    @ApiProperty()
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare updatedAt: Date;
}

export default PropuestaDeServicioServicios;
