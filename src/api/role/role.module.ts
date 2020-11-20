import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'src/utils/constants/database';

// new endopoint added

@Module({
    providers: [RoleService],
    exports: [RoleService],
    controllers: [RoleController],
    imports: [MongooseModule.forFeature([database.dev.schema['role']])]
})
export class RoleModule { }
