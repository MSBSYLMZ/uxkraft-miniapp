import { Body, Controller, Get, Param, Patch, Put, Query } from "@nestjs/common";
import { SpecItemService } from "./spec-item.service";




@Controller('api/spec-item')
export class SpecItemController {
  constructor(private readonly specItemService: SpecItemService) { }

  @Get()
  findAll(
    @Query('query') query?: string,
    @Query('orderBy') orderBy?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string
  ) {
    return this.specItemService.findAll(limit ? +limit : undefined, page ? +page : undefined, query, orderBy);
  }

  @Put()
  bulkUpdate(@Body() body: Array<{ id: number;[key: string]: any }>) {
    return this.specItemService.bulkUpdate(body);
  }
}