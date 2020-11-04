import { Module } from '@nestjs/common';
import { TreatmentImagesService } from './treatment-images.service';

@Module({
  providers: [TreatmentImagesService],
  exports: [TreatmentImagesService]
})
export class TreatmentImagesModule { }
