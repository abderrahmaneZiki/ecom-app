import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UsePipes } from '@nestjs/common';
import AddCartDto from 'src/dto/add-cart.dto';
import ReplyDto from 'src/dto/reply.dto';
import ReviewDto from 'src/dto/review.dto';
import UpdatePanelDto from 'src/dto/update-panel.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { ClientSpaceService } from './client-space.service';

@Controller('client-space')
export class ClientSpaceController {
    constructor(private clientService: ClientSpaceService) { }

    @Get()
    async listProduct() {
        return await this.clientService.listProduct()
    }

    @Get('/:id')
    async productById(@Param('id') id: string) {
        return await this.clientService.productById(id)
    }

    @Get("cart/:id")
    async getCart(@Param('id') id: any) {
        return await this.clientService.getCart(id);
    }

    @Post("create-cart")
    @UsePipes(new ValidationPipe())
    async createCart(@Body() data: AddCartDto) {
        const cart = await this.clientService.createCart(data);
        return cart;
    }

    @Post('add-product/:id')
    async addProductToCart(@Body() data, @Param("id") id: string) {
        return await this.clientService.addProductToCart(data, id);
    }

    @Delete('delete-product/:id')
    async deleteFromCart(@Param("id") id: string) {
        return await this.clientService.removeProductFromCart(id);
    }
    @Put('update-product/:id')
    @UsePipes(new ValidationPipe())
    async updateQuantity(@Param("id") id: string, @Body() data: UpdatePanelDto) {
        return await this.clientService.updateQuantity(id, data);
    }
    @Post("create-order")
    async createOrder(@Body() data: any) {
        let client = null;
        const customer = await this.clientService.createCustomer(data.customer);
        if (customer) {
            let order = data
            order.customer = customer;
            return await this.clientService.addOrder(order);
        }
        throw new HttpException("create customer faild,order doesn't created", HttpStatus.BAD_REQUEST);
    }

    @Post('/review')
    @UsePipes(new ValidationPipe())
    async commentProduct(@Body() data: ReviewDto) {
        return await this.clientService.addReview(data);
    }

    @Post('/reply')
    @UsePipes(new ValidationPipe())
    replyToComent(@Body() data: ReplyDto) {
        return this.clientService.addReply(data);
    }

    @Post()
    contactUS() {

    }
}
