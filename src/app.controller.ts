import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  /* constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login/old')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/old')
  getProfile(@Request() req) {
    console.log('mi usuario ', req.user);
    return req.user;
  } */
}
