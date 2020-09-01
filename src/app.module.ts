import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './api/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from './utils/constants';
import { RoleModule } from './api/role/role.module';

const urlDb = database.url + database.dev.db;

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(urlDb),
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
