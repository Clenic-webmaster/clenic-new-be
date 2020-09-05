import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../api/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { security } from '../utils/constants/security';
import { JwtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/api/role/role.module';
import { BussinessModule } from 'src/api/bussiness/bussiness.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    BussinessModule,
    PassportModule,
    JwtModule.register({
      secret: security.secret,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
