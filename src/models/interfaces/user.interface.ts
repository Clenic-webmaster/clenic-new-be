import { Document } from 'mongoose';
import { Role } from './role.interface';
import { IPosition, IUserPersonalInformation, IUserSession } from 'src/utils/types';
import { Bussiness } from './bussiness.interface';

export class User extends Document {
  readonly _id: string;
  readonly identifier?: string;
  readonly companyIdentifier?: string;
  readonly email?: string;
  readonly password?: string;
  readonly position?: IPosition;
  readonly state?: "INACTIVO" | "VACACIONES" | "EN RUTA" | "DISPONIBLE";
  readonly personalInformation?: IUserPersonalInformation;
  readonly sessions?: [IUserSession];
  bussiness?: Bussiness | string;
  readonly role?: Role | string;
}