import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'src/utils/constants/database';
import { TreatmentImagesModule } from 'src/treatment-images/treatment-images.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [EquipmentService],
  exports: [EquipmentService],
  controllers: [EquipmentController],
  imports: [
    MongooseModule.forFeature([database.dev.schema["equipment"]]),
    TreatmentImagesModule,
    UserModule
  ]
})
export class EquipmentModule { }
