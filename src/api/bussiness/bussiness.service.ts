import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Bussiness, Order } from 'src/models/interfaces';
import { ErrorHandler } from 'src/utils/errors';

@Injectable()
export class BussinessService {
    constructor(@InjectModel('Bussiness') private readonly _bussinessModel: Model<Bussiness>) { }

    async getBussinessModelSession(): Promise<ClientSession> {
        const session = await this._bussinessModel.db.startSession()
        return session;
    }

    async getBussinessById(bussinessId: string) {
        const bussiness = await this._bussinessModel.findById(bussinessId);
        return bussiness;
    }

    async getBussinessFullOrders(bussinessId: string): Promise<Order[]> {
        const bussiness: Bussiness = await this._bussinessModel.findById(bussinessId)
            .populate({
                path: 'clenics',
                populate: [
                    {
                        path: 'orders',
                        populate: [
                            { path: 'user' },
                            { path: 'engineer' },
                            { path: 'equipment' }
                        ]
                    },
                    { path: 'user' }
                ]
            }).catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error) })

        var orders: [Order]
        bussiness.clenics.forEach((element) => {
            orders.concat(element.orders);
        })

        return orders;
    }

    async createBussiness(bussinessDto, session?: ClientSession): Promise<Bussiness> {
        const bussiness = new this._bussinessModel(bussinessDto);
        return await bussiness.save({ session: session });
    }
}
