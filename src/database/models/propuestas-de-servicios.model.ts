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
    HasMany,
    BelongsToMany
} from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';
import { ESTADOS } from 'src/common/constants/estados.constants';
import { ADJUDICADO } from 'src/common/constants/adjudicados.constants';   
import {Empresas} from './empresas.model';
import {PropuestaDeServicioServicios} from './propuesta-de-servicio-servicios.model';
import {GruposDeServicios} from './grupos-de-servicios.model';
import { PropuestaDeServicioSubServicios } from './propuesta-de-servicio-sub-servicios.model';
import { SubServicios } from './sub-servicios.model';



@Table({
    tableName: 'propuestas_de_servicios',
    timestamps: true,
})
export class PropuestasDeServicios extends Model<PropuestasDeServicios> {
    @ApiProperty({ type: 'number', default: 1 })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codigo: number;

    @ApiProperty({ type: 'number', default: 2024 })
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare año: number;

    @ApiProperty({ type: 'number', default: 10.00 })
    @Column({
        type: DataType.DECIMAL(6,2),
        allowNull: false,
    })
    declare pago: number;

    @ApiProperty({ type: 'string', format: 'date' })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare fecha: Date;

    @ForeignKey(() => Empresas)
    @ApiProperty({ type: 'string', default: '11.111.111-1' })
    @Column({
        type: DataType.STRING(15),
        allowNull: false,
    })
    declare rut_receptor: string;

    @BelongsTo(() => Empresas)
    declare empresa: Empresas;

    @ApiProperty({ type: 'string', default: ESTADOS.OPCION_1 })
    @Column({
        type: DataType.ENUM(ESTADOS.OPCION_1, ESTADOS.OPCION_2),
        allowNull: false,
    })
    declare estado: string;

    @ApiProperty({ type: 'string', default: ADJUDICADO.OPCION_1 })
    @Column({
        type: DataType.ENUM(ADJUDICADO.OPCION_1, ADJUDICADO.OPCION_2),
        allowNull: false,
    })
    declare adjudicado: string;

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

    @BelongsToMany(() => GruposDeServicios, () => PropuestaDeServicioServicios, )
    declare grupoDeServicios: GruposDeServicios[];

    @BelongsToMany(
        () => SubServicios,
        () => PropuestaDeServicioSubServicios,
    )
    declare subServicios: SubServicios[];

}

export default PropuestasDeServicios;