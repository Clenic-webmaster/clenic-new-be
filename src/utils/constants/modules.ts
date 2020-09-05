import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../../api/user/user.module';
import { BussinessModule } from 'src/api/bussiness/bussiness.module';
import { OrderModule } from 'src/api/order/order.module';
import { EquipmentModule } from 'src/api/equipment/equipment.module';

export const modules = { //For API Documentation
  auth: AuthModule,
  user: UserModule,
  bussiness: BussinessModule,
  order: OrderModule,
  equipment: EquipmentModule
};
