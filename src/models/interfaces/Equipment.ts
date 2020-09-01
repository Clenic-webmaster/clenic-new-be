import { Document } from 'mongoose';

export class Equipment extends Document {
    readonly _id: string;
    readonly name?: string;
    readonly brand?: string;
    readonly serial?: string;
    readonly orders?: [any];
    readonly manufacturing?: Date;
    readonly images?: [string];
}