import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { OrderService } from './order.service';

@Controller('work-space/orders')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Get()
    //@UseGuards(new AuthGuard())
    async listOrders() {
        return await this.orderService.listOrders();
    }

    @Get('/filter')
    @UseGuards(new AuthGuard())
    async orderFilter(@Query('id') id: string, @Query('state') state: string) {

        if (id && !state) {
            return await this.orderService.orderById(id);
        }
        if (!id && state) {
            return await this.orderService.orderByState(state);
        }

    }

    @Put("/:id")
    @UseGuards(new AuthGuard())
    async updateOrderState(@Param('id') id: string, @Body() state: any) {
        return await this.orderService.updateState(id, state);
    }

}
