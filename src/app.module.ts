import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './api/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from './utils/constants/database';
import { RoleModule } from './api/role/role.module';
import { BussinessModule } from './api/bussiness/bussiness.module';
import { OrderModule } from './api/order/order.module';
import { EquipmentModule } from './api/equipment/equipment.module';
import * as cors from 'cors';
import * as morgan from 'morgan';

const urlDb = database.urlProd + database.dev.db;

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(urlDb, { useNewUrlParser: true, useUnifiedTopology: true }),
    RoleModule,
    BussinessModule,
    OrderModule,
    EquipmentModule,
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
