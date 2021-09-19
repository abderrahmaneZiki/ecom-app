import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CartEntity from 'src/entities/cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports:[TypeOrmModule.forFeature([CartEntity])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
