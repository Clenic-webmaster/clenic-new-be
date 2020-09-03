import { Document } from 'mongoose';

export class Role extends Document {
  readonly _id: string;
  readonly name?: string;
  readonly active?: boolean;
}
