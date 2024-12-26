import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    HasOne,
    CreatedAt,
    UpdatedAt,
    Sequelize,
} from 'sequelize-typescript';

import { Usuarios } from './usuarios.model';
import { TIPOS_DE_USUARIO } from 'src/common/constants/tipos-usuarios.constants';

import { ApiProperty } from '@nestjs/swagger';

@Table({
    tableName: 'tipos',
    timestamps: true,
})
export class Tipos extends Model<Tipos> {
    @ApiProperty({ type: 'string', default: TIPOS_DE_USUARIO.OPCION_1 })
    @PrimaryKey
    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    declare nombre: string;

    @HasOne(() => Usuarios)
    declare usuario: Usuarios; // Relación uno a uno

    @ApiProperty()
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    })
    declare createdAt: Date;

    @ApiProperty()
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    })
    declare updatedAt: Date;
}

export default Tipos;
