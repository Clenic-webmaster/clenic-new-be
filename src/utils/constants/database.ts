import { UserSchema, RoleSchema, BussinessSchema, EquipmentSchema, OrderSchema } from 'src/models/schemas';

export const database = {
  url: 'mongodb://localhost/',
  urlProd: 'mongodb://adminClenic:!2020Clenic_Upc@157.230.63.34:27017/',
  dev: {
    db: 'clenic-db?authSource=admin?retryWrites=false',
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
