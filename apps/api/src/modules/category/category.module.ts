import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { Category } from "./category.model";


@Module({
  imports: [
    SequelizeModule.forFeature([
      Category,
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})

export class CategoryModule { }