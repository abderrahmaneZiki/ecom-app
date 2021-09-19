import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import CategoryEntity from 'src/entities/category.entity';
import ProductEntity from 'src/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity,ProductEntity])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
