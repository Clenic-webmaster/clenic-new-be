import { Document } from 'mongoose';
import { Role } from './Role';
import { IPosition, IUserPersonalInformation, IUserSession } from 'src/utils/types';

export class User extends Document {
  readonly _id: string;
  readonly identifier?: string;
  readonly email?: string;
  readonly password?: string;
  readonly position?: IPosition;
  readonly state?: "INACTIVO" | "VACACIONES" | "EN RUTA" | "DISPONIBLE";
  readonly personalInformation?: IUserPersonalInformation;
  readonly sessions?: [IUserSession];
  readonly role?: Role;
}