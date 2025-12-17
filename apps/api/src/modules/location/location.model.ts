import { Column, DataType, Model, Table } from "sequelize-typescript";



@Table({ tableName: "location", timestamps: true })

export class Location extends Model<Location> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
}