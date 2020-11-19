import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { database } from '../../utils/constants/database';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    MongooseModule.forFeature([database.dev.schema['user']]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule { }
