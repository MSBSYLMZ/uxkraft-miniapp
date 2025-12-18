import { Controller, Get, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";




@Controller('api/category/all')
export class CategoryController {
  constructor(private readonly category: CategoryService) { }

  @Get()
  findAll() {
    return this.category.findAll();
  }
}