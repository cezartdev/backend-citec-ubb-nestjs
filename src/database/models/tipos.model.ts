import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    HasOne
} from 'sequelize-typescript';

import { Usuarios } from './usuarios.model';

@Table({
    tableName: 'tipos',
})
export class Tipos extends Model<Tipos> {
    @PrimaryKey
    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    declare nombre: string;

    @HasOne(() => Usuarios)
    declare usuario: Usuarios; // Relación uno a uno
}

export default Tipos;