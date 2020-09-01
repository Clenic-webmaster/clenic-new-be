import { Injectable, BadRequestException, NotFoundException, ServiceUnavailableException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { RoleService } from 'src/api/role/role.service';
import { IUserSession } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> { //USERNAME IS ONLY EMAIL
    let myUser = await this.userService.getUserByEmail(username);
    if (myUser) {
      if (await compare(pass, myUser.password)) {
        const { ...result } = myUser;
        return myUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async login(user: any) {
    const payload = {
      userId: user._id,
      role: user.role
    };

    var relatedUser = await this.userService.getUserById(user._id)
      .catch((error) => {
        throw new HttpException({
          message: 'An error has occurred, please contact your administrator.',
          error
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      })

    if (relatedUser) {
      let access_token = this.jwtService.sign(payload);
      relatedUser.sessions.push({
        jwt: access_token,
        identifierDevice: `DEFAULT_DEVICE_${access_token.substr(access_token.length - 5, access_token.length)}`,
        lastActive: new Date(),
        location: `DEFAULT_DEVICE_${access_token.substr(access_token.length - 5, access_token.length)}`
      })
      await relatedUser.save()
        .catch((error) => {
          throw new HttpException({
            message: 'An error has occurred, please contact your administrator.',
            error
          }, HttpStatus.INTERNAL_SERVER_ERROR);
        })

      return {
        access_token: this.jwtService.sign(payload),
        user: relatedUser,
      };
    }
  }

  async logout(sessionToken: any, userId: string) {
    var relatedUser = await this.userService.getUserById(userId)
      .catch((error) => {
        throw new HttpException({
          message: 'An error has occurred, please contact your administrator.',
          error
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      })

    if (relatedUser) {
      let indexOfSession = relatedUser.sessions.findIndex((value: IUserSession) => {
        return value.jwt == sessionToken;
      })
      if (indexOfSession >= 0) {
        relatedUser.sessions.splice(indexOfSession, 1);
        await relatedUser.save()
          .catch((error) => {
            throw new HttpException({
              message: 'An error has occurred, please contact your administrator.',
              error
            }, HttpStatus.INTERNAL_SERVER_ERROR);
          })
        return {
          message: 'The session has been closed successfully',
        };
      } else {
        throw new HttpException({
          message: 'There is no active sessions with the requested token.',
        }, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException({
        message: 'User does not exist.'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async checkJWtInSession(jwt: string, userId: string) {
    var relatedUser = await this.userService.getUserById(userId)
      .catch((error) => {
        throw new HttpException({
          message: 'An error has occurred, please contact your administrator.',
          error
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      })

    if (relatedUser) {
      let indexOfSession = relatedUser.sessions.findIndex((value: IUserSession) => {
        return value.jwt == jwt;
      })
      if (indexOfSession >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new HttpException({
        message: 'User does not exist.'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async register(user: any) {
    let findUser = await this.userService.getUserByEmail(user.email);
    if (findUser) {
      throw new HttpException({
        message: 'Email already taken.'
      }, HttpStatus.BAD_REQUEST);
    } else {
      if (
        !await this.roleService.getRoleById(user.role)
          .catch((error) => {
            throw new HttpException({
              message: 'An error has occurred, please contact your administrator.',
              error
            }, HttpStatus.INTERNAL_SERVER_ERROR);
          })
      ) {
        throw new HttpException({
          message: 'Role does not exist.'
        }, HttpStatus.BAD_REQUEST);
      } else {
        let storedUser = await this.userService.createUser(user)
          .catch((error) => {
            throw new HttpException({
              message: 'An error has occurred, please contact your administrator.',
              error
            }, HttpStatus.INTERNAL_SERVER_ERROR);
          })
        return {
          user: storedUser,
        };
      }
    }
  }
}
