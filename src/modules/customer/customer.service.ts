import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CustomerEntity from 'src/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>) { }


        async listCustomer(){
            return await this.customerRepository.find({
                relations:['orders','orders.cart','orders.cart.panel','orders.cart.panel.product']
            })
        }
}
