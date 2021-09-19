import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CartEntity from 'src/entities/cart.entity';
import CustomerEntity from 'src/entities/customer.entity';
import OrderEntity from 'src/entities/order.entity';
import PanelEntity from 'src/entities/panel.entity';
import ProductEntity from 'src/entities/product.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,CustomerEntity,OrderEntity,CartEntity,PanelEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
