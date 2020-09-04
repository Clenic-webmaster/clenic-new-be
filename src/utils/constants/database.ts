import { UserSchema, RoleSchema, BussinessSchema, EquipmentSchema, OrderSchema } from 'src/models/schemas';

export const database = {
  connection: 'mongodb://',
  urlLocal: 'mongodb://localhost/',
  dev: {
    auth: 'adminClenic:!2020Clenic_Upc@',
    ip: '157.230.63.34:27017/',
    db: 'clenic-db',
    options: '?authSource=admin?retryWrites=false',
    schema: {
      user: { name: 'User', schema: UserSchema },
      role: { name: 'Role', schema: RoleSchema },
      bussiness: { name: 'Bussiness', schema: BussinessSchema },
      equipment: { name: 'Equipment', schema: EquipmentSchema },
      order: { name: 'Order', schema: OrderSchema },
    },
  },
};
