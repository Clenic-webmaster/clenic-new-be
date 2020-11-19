import { Document } from 'mongoose';
import { Order } from './order.interface';

export class Equipment extends Document {
    readonly _id: string;
    readonly name?: string;
    readonly brand?: string;
    readonly serial?: string;
    readonly orders?: Order[] | string[];
    readonly manufacturing?: string;
    readonly images?: string[];
}