import { Controller, Get, Query } from "@nestjs/common";
import { SpecItemService } from "./spec-item.service";




@Controller('spec-item')
export class SpecItemController {
  constructor(private readonly specItemService: SpecItemService) { }

  @Get()
  findAll(
    @Query('query') query?: string,
    @Query('orderBy') orderBy?: string
  ) {
    return this.specItemService.findAll(query, orderBy);
  }
}