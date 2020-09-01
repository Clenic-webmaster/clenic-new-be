import { Injectable, BadRequestException, NotFoundException, ServiceUnavailableException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { RoleService } from 'src/api/role/role.service';

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

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  //1998-10-14T14:48:00.000
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
