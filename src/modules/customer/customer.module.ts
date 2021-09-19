import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import CartEntity from 'src/entities/cart.entity';
import CustomerEntity from 'src/entities/customer.entity';
import OrderEntity from 'src/entities/order.entity';
import PanelEntity from 'src/entities/panel.entity';
import ProductEntity from 'src/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,CustomerEntity,OrderEntity,CartEntity,PanelEntity])],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
