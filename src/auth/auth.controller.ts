import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto, UserDto } from 'src/models/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginUserDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: UserDto) {
    return this.authService.register(user);
  }
}
