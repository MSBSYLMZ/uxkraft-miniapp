import { Module } from "@nestjs/common";
import { SpecItemController } from "./spec-item.controller";
import { SpecItemService } from "./spec-item.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { SpecItem } from "./spec-item.model";
import { Spec } from "../spec/spec.model";
import { Category } from "../category/category.model";
import { Phase } from "../phase/phase.model";
import { Address } from "../address/address.model";
import { Vendor } from "../vendor/vendor.model";
import { Location } from "../location/location.model";


@Module({
  imports: [
    SequelizeModule.forFeature([
      SpecItem,
      Spec,
      Location,
      Category,
      Phase,
      Address,
      Vendor,
    ]),
  ],
  controllers: [SpecItemController],
  providers: [SpecItemService],
  exports: [SpecItemService],
})

export class SpecItemModule { }