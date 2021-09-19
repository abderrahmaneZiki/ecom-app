import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import CartDto from 'src/dto/cart.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {

    constructor(private cartService:CartService) {}

    @Post()
    @UseGuards(new AuthGuard())
    createCart(@Body() data:CartDto){
        return this.cartService.createCart(data);
    }

    @Put('/:id')
    @UseGuards(new AuthGuard())
    updateCart(@Param("id") id:any,@Body() data:CartDto){
        return this.cartService.updateCart(id,data);
    }
}
