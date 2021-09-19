import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CartEntity from 'src/entities/cart.entity';
import CustomerEntity from 'src/entities/customer.entity';
import OrderEntity from 'src/entities/order.entity';
import ProductEntity from 'src/entities/product.entity';
import ReplyEntity from 'src/entities/reply.entity';
import ReviewEntity from 'src/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkSpaceService {
     
    constructor(@InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>,
        @InjectRepository(ReplyEntity) private readonly replyRepository: Repository<ReplyEntity>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
        @InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>) { }


        

}
