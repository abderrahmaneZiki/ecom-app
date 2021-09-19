import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OrderEntity from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>) { }

    async listOrders() {
        return await this.orderRepository.find({
            relations: ['cart', 'cart.panel', 'cart.panel.product', 'customer']
        })
    }

    async orderById(id) {
        return await this.orderRepository.findOne({
            where: { id: id },
            relations: ['cart', 'cart.panel', 'cart.panel.product', 'customer']
        })
    }

    async orderByState(state) {
        return await this.orderRepository.find({
            where: { order_status: state },
            relations: ['cart', 'cart.panel', 'cart.panel.product', 'customer']
        })
    }

    async updateState(id, state) {
        let order = await this.orderRepository.findOne({
            where: { id: id }})
        if(order){
           order.order_status=state;
           await this.orderRepository.update(id,order);
          throw new HttpException('State updated',HttpStatus.OK);
        }
        throw new HttpException('Order not Found',HttpStatus.NOT_FOUND);
    }

}
