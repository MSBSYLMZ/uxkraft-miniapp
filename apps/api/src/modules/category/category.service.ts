import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Location } from "../location/location.model";
import { Category } from "./category.model";



@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category
  ) { }


  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

}