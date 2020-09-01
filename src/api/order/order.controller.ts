import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly _orderService: OrderService) { }

    @Get('/list')
    async getOrders() {
        const orders = await this._orderService.getOrders();
        return orders;
    }
}
