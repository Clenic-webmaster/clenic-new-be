import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bussiness } from 'src/models/interfaces';

@Injectable()
export class BussinessService {
    constructor(@InjectModel('Bussiness') private readonly _bussinessModel: Model<Bussiness>) { }

    async getBussiness() {
        const bussiness = await this._bussinessModel.find();
        return bussiness;
    }
}
