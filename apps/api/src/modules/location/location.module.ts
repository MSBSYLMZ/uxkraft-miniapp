import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Location } from "../location/location.model";
import { LocationService } from "./location.service";
import { LocationController } from "./location.controller";


@Module({
  imports: [
    SequelizeModule.forFeature([
      Location,
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})

export class LocationModule { }