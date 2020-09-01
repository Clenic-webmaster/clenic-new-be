import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/models/interfaces';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly _orderModel: Model<Order>) { }

    async getOrders() {
        const orders = await this._orderModel.find();
        return orders;
    }
}
