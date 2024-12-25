import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
} from 'sequelize-typescript';

@Table({
    tableName: 'claves_apis',
})
export class ClavesApis extends Model<ClavesApis> {
    @PrimaryKey
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare url: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
    })
    declare clave: string
}
