import { Column, DataType, Model, Table } from "sequelize-typescript";



@Table({ tableName: "category", timestamps: true })

export class Category extends Model<Category> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
}