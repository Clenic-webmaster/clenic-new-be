import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Equipment } from 'src/models/interfaces';

@Injectable()
export class EquipmentService {
    constructor(@InjectModel('Equipment') private readonly _equipmentModel: Model<Equipment>) { }

    async getEquipmentModelSession(): Promise<ClientSession> {
        const session = await this._equipmentModel.db.startSession()
        return session;
    }
    
    async getEquipments() {
        const equipments = await this._equipmentModel.find();
        return equipments;
    }
}
