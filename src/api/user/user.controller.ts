import {
  Controller,
  UseGuards,
  Request,
  Get,
  Res,
  Param,
  HttpStatus,
  NotFoundException,
  Put,
  Body,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { EngineerLocationDto, JWTPayloadDto } from 'src/models/dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorators';
import { security } from 'src/utils/constants/security';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(security.roles.ROLE_ADMIN)
  @Get('/get/:id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this._userService.getUserById(id);
    if (!user) throw new NotFoundException('User does not exists');
    return res.status(HttpStatus.OK).json({
      user,
    });
  }

  @Roles(security.roles.ROLE_ENGINEER)
  @Put('setMyLocation')
  async setLocation(@Body() location: EngineerLocationDto, @Req() req) {
    const jwtPayload: JWTPayloadDto = req.user;
    return await this._userService.updateUserLocation(location, jwtPayload.userId);
  }

  @Roles(security.roles.ROLE_ADMIN)
  @Get('getEngineersLocation')
  async getEngineersLocation(@Req() req) {
    const jwtPayload: JWTPayloadDto = req.user;
    return await this._userService.getEngineersLocation(jwtPayload.companyIdentifier);
  }

  @Roles(security.roles.ROLE_ADMIN, security.roles.ROLE_CLENIC)
  @Get('engineer/:id/location')
  async getEngineerLocationById(@Param('id') id, @Req() req) {
    const jwtPayload: JWTPayloadDto = req.user;
    return await this._userService.getEngineerLocationById(id, jwtPayload.companyIdentifier);
  }
}
