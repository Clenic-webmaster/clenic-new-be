import { Schema } from 'mongoose';
import { security } from 'src/utils/constants';

export const UserSchema = new Schema({
  identifier: { type: String, required: true },
  email: { type: String, default: '' },
  password: { type: String, required: true },
  position: {
    lat: { type: Number, required: true, default: Number((0.0).toFixed(6)) },
    long: { type: Number, required: true, default: Number((0.0).toFixed(6)) },
  },
  state: { type: String, default: '', required: false },
  personalInformation: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    birthday: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    imageProfile: { type: String, default: '' },
    active: { type: Boolean, default: true },
  },
  sessions: [
    {
      jwt: { type: String, required: true },
      identifierDevice: { type: String, required: true },
      location: { type: String, required: false, },
      lastActive: { type: Date, required: false, default: Date.now() }
    }
  ],
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
}, { collection: 'users' });
