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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@Request() req) {
    const users = await this.userService.getUsers();
    return users;
  }

  @ApiParam({ name: 'id' })
  @Delete('/:id')
  async deleteUser(@Res() res, @Param('id') id) {
    const user = await this.userService.deleteUser(id);
    if (!user) throw new NotFoundException('User does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'User Deleted',
      user,
    });
  }
}
