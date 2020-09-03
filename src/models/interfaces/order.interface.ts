import { Document } from 'mongoose';
import { User } from './user.interface';
import { Equipment } from './equipment.interface';
import { Bussiness } from './bussiness.interface';
import { IPosition } from 'src/utils/types';

export class Order extends Document {
    readonly _id: string;
    readonly clenic?: Bussiness;
    readonly engineer?: User;
    readonly route?: [IPosition];
    readonly equipment?: Equipment;
    readonly description?: string;
    readonly serviceDate?: Date;
    readonly createDate?: Date;
    readonly state?: "SOLICITADO" | "PENDIENTE" | "EN PROGRESO" | "TERMINADO" | "CANCELADO";
}