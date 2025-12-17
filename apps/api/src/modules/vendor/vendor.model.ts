
import { Model, Column, DataType, ForeignKey, HasOne, Table, BelongsTo } from "sequelize-typescript";
import { Address } from "../address/address.model";



@Table({ tableName: "vendor", timestamps: true })

export class Vendor extends Model<Vendor> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @ForeignKey(() => Address)
  @Column({ type: DataType.STRING, allowNull: false })
  addressId!: string;

  @BelongsTo(() => Address)
  adress!: string;
}