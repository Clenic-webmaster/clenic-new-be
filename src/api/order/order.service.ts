import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { AssignEngineerDto, OrderDto, UpdateOrderDto } from 'src/models/dto';
import { Order } from 'src/models/interfaces';
import * as dot from 'dot-object';
import { ErrorHandler } from 'src/utils/errors';


@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly _orderModel: Model<Order>) { }

    async getOderModelSession(): Promise<ClientSession> {
        const session = await this._orderModel.db.startSession()
        return session;
    }

    async getOrders() {
        const orders = await this._orderModel.find();
        return orders;
    }

    async getOrdersCountByBussinessId(bussinessId: string) {
        const count = await this._orderModel.countDocuments({ clenic: bussinessId }); //Clenic is a bussiness model
        return count;
    }

    async createOrder(newOrder: OrderDto, bussinessId: string): Promise<Order> {
        const ordersCurrentCount = await this.getOrdersCountByBussinessId(bussinessId);
        newOrder.correlative = this.generateOrderCorrelative('OT-', (ordersCurrentCount + 1).toString());
        newOrder.clenic = bussinessId;
        const order = new this._orderModel(newOrder); // El primer estado por defecto es SOLICITADO
        return await order.save();
    }

    async assignEngineer(assignEngineer: AssignEngineerDto, orderId: string): Promise<Order> {
        return await this._orderModel.findByIdAndUpdate(orderId, { engineer: assignEngineer.engineer });
    }

    async updateOrder(updateOrder: UpdateOrderDto, orderId: string): Promise<Order> {

        //Update only comming fields
        let dotUpdateOrder = dot.dot({ updateOrder });

        let order = await this._orderModel.findOneAndUpdate({ _id: orderId }, { $set: dotUpdateOrder }, { new: true })
            .catch((error) => {
                throw ErrorHandler.throwDefaultInternalServerError(error);
            })
        return await order;
    }

    generateOrderCorrelative(prefix: string, count: string): string {
        return prefix + ("00000").substr(0, 5 - count.length) + count;
    }
}
