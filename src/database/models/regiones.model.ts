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
    HasOne
} from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';
import {Provincias} from './provincias.model';


@Table({
    tableName: 'regiones',
    timestamps: true,
})
export class Regiones extends Model<Regiones> {
    @ApiProperty({ type: 'number', default: 1 })
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number;

    @ApiProperty({ type: 'string', default: 'REGION DEL BIO BIO' })
    @Column({
        type: DataType.STRING(65),
        allowNull: false,
    })
    declare nombre: string;

    @ApiProperty({ type: 'string', default: 'VIII' })
    @Column({
        type: DataType.STRING(5),
        allowNull: false,
    })
    declare ordinal: string;

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

    @HasOne(() => Provincias)
    declare provincia: Provincias; // Relación uno a uno
}

export default Regiones;