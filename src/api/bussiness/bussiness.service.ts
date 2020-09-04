import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Bussiness, User } from 'src/models/interfaces';
import { BussinessDto } from 'src/models/dto';
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

    async createBussiness(bussinessDto, session?: ClientSession): Promise<Bussiness> {
        const bussiness = new this._bussinessModel(bussinessDto);
        return await bussiness.save({ session: session });
    }

    async getClenicsByBussinessId(bussinessId: string): Promise<Bussiness[]> {
        const bussiness: any = await this._bussinessModel.findById(bussinessId).populate({ path: 'clenics', populate: { path: 'user' } })
            .catch((error) => {
                throw ErrorHandler.throwDefaultInternalServerError(error);
            })
        if (bussiness) {
            let clenics = bussiness.clenics;
            return clenics;
        } else {
            throw ErrorHandler.throwNotFoundError('Bussiness');
        }
    }
}
