import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../api/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { security } from '../utils/constants';
import { JwtStrategy, LocalStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/api/role/role.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PassportModule,
    JwtModule.register({
      secret: security.secret,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
