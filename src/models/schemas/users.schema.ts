import moment = require('moment');
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  identifier: { type: String, required: true },
  companyIdentifier: { type: String },
  email: { type: String, default: '' },
  password: { type: String, required: true },
  position: {
    _id: false,
    lat: { type: Number, required: true, default: Number((0.0).toFixed(6)) },
    long: { type: Number, required: true, default: Number((0.0).toFixed(6)) },
  },
  state: { type: String, default: '', required: false },
  personalInformation: {
    _id: false,
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    birthday: { type: String, required: false, default: '' },
    createdAt: { type: String, required: false, default: moment().format("YYYY-MM-DD HH:mm:ss") },
    imageProfile: { type: String, default: '' },
    active: { type: Boolean, default: true },
  },
  sessions: [
    {
      _id: false,
      jwt: { type: String, required: true },
      identifierDevice: { type: String, required: true },
      location: { type: String, required: false, },
      lastActive: { type: String, required: false, default: moment().format("YYYY-MM-DD HH:mm:ss") }
    }
  ],
  bussiness: { type: Schema.Types.ObjectId, ref: 'Bussiness' },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
}, { collection: 'users' });
