import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CartEntity from 'src/entities/cart.entity';
import CustomerEntity from 'src/entities/customer.entity';
import OrderEntity from 'src/entities/order.entity';
import PanelEntity from 'src/entities/panel.entity';
import ProductEntity from 'src/entities/product.entity';
import ReplyEntity from 'src/entities/reply.entity';
import ReviewEntity from 'src/entities/review.entity';
import { ClientSpaceController } from './client-space.controller';
import { ClientSpaceService } from './client-space.service';

@Module({
  imports:[TypeOrmModule.forFeature([ReviewEntity,ProductEntity,ReplyEntity,CustomerEntity,OrderEntity,CartEntity,PanelEntity])],
  controllers: [ClientSpaceController],
  providers: [ClientSpaceService]
})
export class ClientSpaceModule {}
