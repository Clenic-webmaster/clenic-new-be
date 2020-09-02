import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto, UserDto, LogoutUserDto, RegisterUserAdminDto } from 'src/models/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginUserDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() body: LogoutUserDto, @Request() req) {
    return this.authService.logout(body.sessionToken, req.user.userId);
  }

  @Post('register/admin')
  async registerAdmin(@Body() user: RegisterUserAdminDto, @Request() req) {
    return this.authService.registerAdmin(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register/clenic')
  async registerClenic(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register/engineer')
  async registerEngineer(@Body() user: UserDto) {
    return this.authService.register(user);
  }
}
