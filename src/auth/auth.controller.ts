import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto, LogoutUserDto, RegisterUserAdminDto, RegisterUserClenicDto, JWTPayloadDto, RegisterUserEngineerDto } from 'src/models/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginUserDto, @Request() req) {
    return this._authService.login(req.user);
  }

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

  @UseGuards(JwtAuthGuard)
  @Post('register/clenic')
  async registerClenic(@Body() user: RegisterUserClenicDto, @Request() req) {
    const jwtPayload: JWTPayloadDto = req.user;
    return this._authService.registerClenic(user, jwtPayload);
  }

  //TO-DO
  @UseGuards(JwtAuthGuard)
  @Post('register/engineer')
  async registerEngineer(@Body() user: RegisterUserEngineerDto, @Request() req) {
    const jwtPayload: JWTPayloadDto = req.user;
    return this._authService.registerEngineer(user, jwtPayload);
  }
}
