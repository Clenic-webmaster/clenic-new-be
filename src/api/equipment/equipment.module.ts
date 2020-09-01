import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'src/utils/constants';

@Module({
  providers: [EquipmentService],
  exports: [EquipmentService],
  controllers: [EquipmentController],
  imports: [MongooseModule.forFeature([database.dev.schema["equipment"]])]
})
export class EquipmentModule { }
