import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Bussiness } from 'src/models/interfaces';
import { BussinessDto } from 'src/models/dto';

@Injectable()
export class BussinessService {
    constructor(@InjectModel('Bussiness') private readonly _bussinessModel: Model<Bussiness>) { }

    async getBussinessModelSession(): Promise<ClientSession> {
        const session = await this._bussinessModel.db.startSession()
        return session;
    }

    async getBussiness() {
        const bussiness = await this._bussinessModel.find();
        return bussiness;
    }

    async createBussiness(bussinessDto, session?: ClientSession): Promise<Bussiness> {
        const bussiness = new this._bussinessModel(bussinessDto);
        return await bussiness.save({ session: session });
    }
}
