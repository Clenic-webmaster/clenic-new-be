import { Module } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { BussinessController } from './bussiness.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'src/utils/constants';

@Module({
    providers: [BussinessService],
    exports: [BussinessService],
    controllers: [BussinessController],
    imports: [MongooseModule.forFeature([database.dev.schema["bussiness"]])]
})
export class BussinessModule { }
