import { Module } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { BussinessController } from './bussiness.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'src/utils/constants/database';
import { EquipmentModule } from '../equipment/equipment.module';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';

@Module({
    providers: [BussinessService],
    exports: [BussinessService],
    controllers: [BussinessController],
    imports: [
        MongooseModule.forFeature([database.dev.schema["bussiness"]]),
        EquipmentModule,
        RoleModule,
        UserModule,
        OrderModule
    ]
})
export class BussinessModule { }
