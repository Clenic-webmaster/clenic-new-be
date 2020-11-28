import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  LogoutUserDto,
  RegisterUserAdminDto,
  RegisterUserClenicDto,
  JWTPayloadDto,
  RegisterUserEngineerDto
} from 'src/models/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from 'src/utils/decorators';
import { security } from 'src/utils/constants/security';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) { }
//login endpoint validation
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return this._authService.validateUser(user);
  }
//logout endpoint validation
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() body: LogoutUserDto, @Request() req) {
    const jwtPayload: JWTPayloadDto = req.user;
    return this._authService.logout(body.sessionToken, req.user.userId);
  }

  @Post('register/admin')
  async registerAdmin(@Body() user: RegisterUserAdminDto) {
    return this._authService.registerAdmin(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(security.roles.ROLE_ADMIN)
  @Post('register/clenic')
  async registerClenic(@Body() user: RegisterUserClenicDto, @Request() req) {
    const jwtPayload: JWTPayloadDto = req.user;
    return this._authService.registerClenic(user, jwtPayload);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(security.roles.ROLE_ADMIN)
  @Post('register/engineer')
  async registerEngineer(@Body() user: RegisterUserEngineerDto, @Request() req) {
    const jwtPayload: JWTPayloadDto = req.user;
    return this._authService.registerEngineer(user, jwtPayload);
  }
}
