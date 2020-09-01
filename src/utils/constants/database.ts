import { UserSchema, RoleSchema, BussinessSchema, EquipmentSchema, OrderSchema } from 'src/models/schemas';

export const database = {
  url: 'mongodb://localhost/',
  dev: {
    db: 'clenic-db',
    port: '',
    schema: {
      user: { name: 'User', schema: UserSchema },
      role: { name: 'Role', schema: RoleSchema },
      bussiness: { name: 'Bussiness', schema: BussinessSchema },
      equipment: { name: 'Equipment', schema: EquipmentSchema },
      order: { name: 'Order', schema: OrderSchema },
    },
  },
};
