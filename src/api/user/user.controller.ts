import {
  Controller,
  UseGuards,
  Request,
  Get,
  Post,
  Delete,
  Body,
  Res,
  Param,
  HttpStatus,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('all')
  async getAll(@Request() req) {
    const users = await this.userService.getUsers();
    return users;
  }

  @Delete('/:id')
  async deleteUser(@Res() res, @Param('id') id) {
    const user = await this.userService.deleteUser(id);
    if (!user) throw new NotFoundException('User does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'User Deleted',
      user,
    });
  }

  @Get('/:id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('User does not exists');
    return res.status(HttpStatus.OK).json({
      user,
    });
  }
}
