import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CartEntity from 'src/entities/cart.entity';
import CustomerEntity from 'src/entities/customer.entity';
import OrderEntity from 'src/entities/order.entity';
import PanelEntity from 'src/entities/panel.entity';
import ProductEntity from 'src/entities/product.entity';
import ReplyEntity from 'src/entities/reply.entity';
import ReviewEntity from 'src/entities/review.entity';
import { WorkSpaceController } from './work-space.controller';
import { WorkSpaceService } from './work-space.service';

@Module({
  imports:[TypeOrmModule.forFeature([ReviewEntity,ProductEntity,ReplyEntity,CustomerEntity,OrderEntity,CartEntity,PanelEntity])],
  controllers: [WorkSpaceController],
  providers: [WorkSpaceService]
})
export class WorkSpaceModule {}
