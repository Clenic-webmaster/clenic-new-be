import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'src/utils/constants';

@Module({
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],
  imports: [MongooseModule.forFeature([database.dev.schema["order"]])]
})
export class OrderModule { }
