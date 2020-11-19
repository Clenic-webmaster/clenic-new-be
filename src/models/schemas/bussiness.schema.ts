import { Schema } from 'mongoose';

export const BussinessSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceEntity: { type: Schema.Types.ObjectId, ref: 'User' }, // REFERENCIA A LA EMPRESA DE MANTENIMIENTO QUE CREA LA CLENIC - EN CASO DE SER EMPRESA DE MANTENIMIENTO, SU VALOR SERA NULO
    type: { type: String, required: true, default: 'MANTENIMIENTO' },
    name: { type: String, required: true, default: '' },
    address: { type: String, required: true, default: '' },
    engineers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    clenics: [{ type: Schema.Types.ObjectId, ref: 'Bussiness' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    equipments: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
}, { collection: 'bussiness' });