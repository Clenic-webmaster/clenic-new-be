import moment = require('moment');
import { Schema } from 'mongoose';

export const EquipmentSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    serial: { type: String, required: true },
    manufacturing: { type: String, default: moment().format("YYYY-MM-DD HH:mm:ss") },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order', required: true }],
    images: [{ type: String, required: true }]
}, { collection: 'equipments' });
