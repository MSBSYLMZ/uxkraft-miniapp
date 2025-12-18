import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "../category/category.model";
import { Address } from "../address/address.model";
import { Spec } from "../spec/spec.model";
import { Location } from "../location/location.model";
import { Phase } from "../phase/phase.model";
import { Vendor } from "../vendor/vendor.model";

// specItem	id	PK	specId	FK	locationId	FK	categroyId	FK	shipsToAddressId	FK	phaseId	FK	vendorId	FK	description	string	basePrice	decimal	markupPercent	decimal	unitPrice	decimal	quantity	decimal	unit	string	poApprovalDate	date	needBy	date	expectedDelivery	date	orderedDate	date	shippedDate	date	deliveredDate	date	shippingNotes	string	shopsSend	date	shopsApproved	date	shopsDelivered	date	note	string	attachment_name	string	attachment_url	string

@Table({ tableName: "specItem", timestamps: true })

export class SpecItem extends Model<SpecItem> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;


  @ForeignKey(() => Spec)
  @Column({ type: DataType.INTEGER, allowNull: false })
  specId!: number;

  @BelongsTo(() => Spec)
  spec!: Spec

  @ForeignKey(() => Location)
  @Column({ type: DataType.INTEGER, allowNull: false })
  locationId!: number;

  @BelongsTo(() => Location)
  location!: Location

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category

  @ForeignKey(() => Phase)
  @Column({ type: DataType.INTEGER, allowNull: false })
  phaseId!: number;

  @BelongsTo(() => Phase)
  phase!: Phase

  @ForeignKey(() => Vendor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  vendorId!: number

  @BelongsTo(() => Vendor)
  vendor!: Vendor

  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER, allowNull: false })
  shipsToAddressId!: number

  @BelongsTo(() => Address)
  shipsToAddress!: Address

  @Column({ type: DataType.STRING, allowNull: true })
  name: string

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  basePrice: number

  @Column({ type: DataType.DECIMAL, allowNull: false })
  markupPercent: number

  @Column({ type: DataType.DECIMAL, allowNull: false })
  unitPrice: number

  @Column({ type: DataType.DECIMAL, allowNull: false })
  quantity: number

  @Column({ type: DataType.STRING, allowNull: false })
  unit: string

  @Column({ type: DataType.DATE, allowNull: true })
  poApprovalDate: Date

  @Column({ type: DataType.DATE, allowNull: true })
  needBy: Date

  @Column({ type: DataType.DATE, allowNull: true })
  expectedDelivery: Date

  @Column({ type: DataType.DATE, allowNull: true })
  orderedDate: Date

  @Column({ type: DataType.DATE, allowNull: true })
  shippedDate: Date

  @Column({ type: DataType.DATE, allowNull: true })
  deliveredDate: Date

  @Column({ type: DataType.STRING, allowNull: true })
  shippingNotes: string

  @Column({ type: DataType.DATE, allowNull: true })
  shopsSend: Date

  @Column({ type: DataType.DATE, allowNull: true })
  shopsApproved: Date

  @Column({ type: DataType.DATE, allowNull: true })
  shopsDelivered: Date

  @Column({ type: DataType.STRING, allowNull: false })
  shipsFrom: string;

  @Column({ type: DataType.STRING, allowNull: true })
  note: string

  @Column({ type: DataType.STRING, allowNull: true })
  attachment_name: string

  @Column({ type: DataType.STRING, allowNull: true })
  attachment_url: string

}