import { Schema } from 'mongoose';

export const EquipmentSchema = new Schema({
    model: { type: String, required: true },
    brand: { type: String, required: true },
    serial: { type: String, required: true },
    manufacturing: { type: Date, default: Date.now() },
    images: { type: [String], validate: (v) => Array.isArray(v) && v.length > 0 }
}, { collection: 'equipments' });
