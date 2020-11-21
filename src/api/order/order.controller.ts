import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
    constructor(private readonly _orderService: OrderService) { }

    @Get('/list')
    async getOrders() {
        const orders = await this._orderService.getOrders();
        return orders;
    }
}
// any