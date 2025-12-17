import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { SpecItem } from "../spec-item/spec-item.model";



@Table({ tableName: "spec", timestamps: true })

export class Spec extends Model<Spec> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @HasMany(() => SpecItem)
  specItem: SpecItem[]
}