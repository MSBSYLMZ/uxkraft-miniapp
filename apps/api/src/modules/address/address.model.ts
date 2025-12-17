import { BelongsTo, Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { Vendor } from "../vendor/vendor.model";
import { SpecItem } from "../spec-item/spec-item.model";



@Table({ tableName: "address", timestamps: true })

export class Address extends Model<Address> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address_id!: string;

  @HasMany(() => SpecItem)
  specItem: SpecItem[]

  @HasMany(() => Vendor)
  vendor: Vendor

}