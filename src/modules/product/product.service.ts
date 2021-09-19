import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import createProductDto from 'src/dto/create-product.dto';
import ProductEntity from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(ProductEntity) private readonly productRepository:Repository<ProductEntity>){}

    async createProduct(data){
        let product =await this.productRepository.create(data);
        console.log(product);
        
        return await this.productRepository.save(product);
    }

    async listProduct(){
        return await this.productRepository.find({
            relations:['category','reviews','reviews.reply']
        });
    }

    async productById(id){
        
        return await this.productRepository.findOne({id},{relations:['category','reviews','reviews.reply']});
    }
    async product(id){
        
        return await this.productRepository.findOne({id},{relations:['category']});
    }
    async updateProduct(id,data){
        let product =await this.product(id);
        if(product){
            return  await this.productRepository.update(id,data);
        }
        throw new HttpException("invalid product",HttpStatus.BAD_REQUEST);
    }

    async removeProduct(id){
        let product =await this.productById(id);
        if(product){
            return await this.productRepository.remove(product);
        }
        throw new HttpException("invalid product",HttpStatus.BAD_REQUEST);
    }
}
