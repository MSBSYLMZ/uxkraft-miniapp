import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Location } from "../location/location.model";



@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location)
    private locationModel: typeof Location
  ) { }


  async findAll(): Promise<Location[]> {
    return this.locationModel.findAll();
  }

}