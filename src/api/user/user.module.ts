import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { database } from '../../utils/constants/database';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [MongooseModule.forFeature([database.dev.schema['user']])],
})
export class UserModule {}
