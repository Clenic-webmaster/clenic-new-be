import { Document } from 'mongoose';
import { User } from './user.interface';
import { Equipment } from './equipment.interface';
import { Order } from './order.interface';

export class Bussiness extends Document {
    readonly _id: string;
    readonly user?: User;
    readonly serviceEntity?: User;
    readonly type?: "MANTENIMIENTO" | "CLENIC";
    readonly name?: string;
    readonly address?: string;
    readonly engineers?: [User];
    readonly clenics?: [Bussiness];
    readonly orders?: [Order];
    readonly equipments?: [Equipment];
}