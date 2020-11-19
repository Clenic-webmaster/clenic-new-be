import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './api/user/user.module';
import { database } from './utils/constants/database';
import { RoleModule } from './api/role/role.module';
import { BussinessModule } from './api/bussiness/bussiness.module';
import { OrderModule } from './api/order/order.module';
import { EquipmentModule } from './api/equipment/equipment.module';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { MongoModule } from './mongo.module';
import { TreatmentImagesModule } from './treatment-images/treatment-images.module';

const mongoURL = `${database.connection}${database.dev.auth}${database.dev.ip}${database.dev.db}${database.dev.options}`;

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongoModule,
    RoleModule,
    BussinessModule,
    OrderModule,
    EquipmentModule,
    TreatmentImagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), morgan('tiny'))
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
