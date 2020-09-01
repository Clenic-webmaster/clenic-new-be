import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
    clenic: { type: Schema.Types.ObjectId, ref: 'Clenic', required: true },
    engineer: { type: Schema.Types.ObjectId, ref: 'User' },
    route: [
        {
            _id: false,
            lat: { type: Number, required: true, default: Number((0.0).toFixed(6)) },
            long: { type: Number, required: true, default: Number((0.0).toFixed(6)) },
        }
    ],
    equipment: { type: Schema.Types.ObjectId, ref: 'Equipment', required: true },
    description: { type: String, required: true },
    serviceDate: { type: Date },
    createDate: { type: Date, default: Date.now() },
    state: { type: String, default: 'SOLICITADO', required: true },
}, { collection: 'orders' });
