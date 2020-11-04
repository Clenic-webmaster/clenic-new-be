import { Document } from 'mongoose';
import { User } from './user.interface';
import { Equipment } from './equipment.interface';
import { Bussiness } from './bussiness.interface';
import { IPosition } from 'src/utils/types';

export class Order extends Document {
    readonly _id: string;
    correlative?: string;
    readonly clenic?: Bussiness | string;
    readonly engineer?: User | string;
    readonly route?: IPosition[];
    readonly equipment?: Equipment;
    readonly description?: string;
    readonly serviceDate?: string;
    readonly createDate?: string;
    readonly state?: "SOLICITADO" | "PENDIENTE" | "EN PROGRESO" | "TERMINADO" | "CANCELADO";
}