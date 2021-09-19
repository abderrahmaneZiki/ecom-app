import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductEntity from 'src/entities/product.entity';
import CategoryEntity from 'src/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,CategoryEntity])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
