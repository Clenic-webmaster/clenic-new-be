import { Schema } from 'mongoose';

export const RoleSchema = new Schema({
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
}, { collection: 'roles' });
