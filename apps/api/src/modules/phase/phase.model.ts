import { Column, DataType, Model, Table } from "sequelize-typescript";



@Table({ tableName: "phase", timestamps: true })

export class Phase extends Model<Phase> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
}