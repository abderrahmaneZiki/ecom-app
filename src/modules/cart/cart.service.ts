import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CartDto from 'src/dto/cart.dto';
import CartEntity from 'src/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
    constructor(@InjectRepository(CartEntity) private readonly cartRepository:Repository<CartEntity>){}


    async createCart(data:CartDto){
        const cart=await this.cartRepository.create(data);
        return await this.cartRepository.save(cart);
    }


    async updateCart(id,data){
           let cart=await this.cartRepository.findOne({where:id});
           if(cart){
               cart=data;
               return await this.cartRepository.update(id,cart);
           }
           throw new HttpException('invalid cart',HttpStatus.BAD_REQUEST);
    }
}
