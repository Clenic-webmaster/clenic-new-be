import {
  Controller,
  UseGuards,
  Request,
  Get,
  Res,
  Param,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JWTPayloadDto } from 'src/models/dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private _userService: UserService) { }

  @Get('profile')
  async getProfile(@Res() res, @Request() req) {
    const jwtPayload: JWTPayloadDto = req.user;
    const user = await this._userService.getUserById(jwtPayload.userId);
    if (!user) throw new NotFoundException('User does not exists');
    return res.status(HttpStatus.OK).json({
      user,
    });
  }

  @Get('/:id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this._userService.getUserById(id);
    if (!user) throw new NotFoundException('User does not exists');
    return res.status(HttpStatus.OK).json({
      user,
    });
  }
}
