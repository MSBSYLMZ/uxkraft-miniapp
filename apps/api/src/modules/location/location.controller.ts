import { Controller, Get, Query } from "@nestjs/common";
import { LocationService } from "./location.service";




@Controller('api/location/all')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }
}