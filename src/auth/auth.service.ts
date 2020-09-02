import { Injectable, BadRequestException, NotFoundException, ServiceUnavailableException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { RoleService } from 'src/api/role/role.service';
import { IUserSession } from 'src/utils/types';
import { RegisterUserAdminDto, UserDto, UserBussinessInformationDto } from 'src/models/dto';
import { startSession, connect, createConnection, ClientSession } from 'mongoose';
import { database } from 'src/utils/constants/database';
import { TransactionHandler } from 'src/utils/transactions';
import { Role, User, Bussiness } from 'src/models/interfaces';
import { ErrorHandler } from 'src/utils/errors';
import { BussinessService } from 'src/api/bussiness/bussiness.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private _bussinessService: BussinessService,
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
        throw ErrorHandler.throwDefaultInternalServerError(error);
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
          throw ErrorHandler.throwDefaultInternalServerError(error);
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
        throw ErrorHandler.throwDefaultInternalServerError(error);
      })

    if (relatedUser) {
      let indexOfSession = relatedUser.sessions.findIndex((value: IUserSession) => {
        return value.jwt == sessionToken;
      })
      if (indexOfSession >= 0) {
        relatedUser.sessions.splice(indexOfSession, 1);
        await relatedUser.save()
          .catch((error) => {
            throw ErrorHandler.throwDefaultInternalServerError(error);
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
        throw ErrorHandler.throwDefaultInternalServerError(error);
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
            throw ErrorHandler.throwDefaultInternalServerError(error);
          })
      ) {
        throw new HttpException({
          message: 'Role does not exist.'
        }, HttpStatus.BAD_REQUEST);
      } else {
        let storedUser = await this.userService.createUser(user)
          .catch((error) => {
            throw ErrorHandler.throwDefaultInternalServerError(error);
          })
        return {
          user: storedUser,
        };
      }
    }
  }

  async registerAdmin(user: RegisterUserAdminDto) {
    let roleAdmin = await this.roleService.getRoleAdmin()
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    let findUser = await this.userService.getUserByEmailAndRole(user.email, roleAdmin._id)
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

    if (findUser) {
      throw ErrorHandler.throwCustomError('Email already taken.', HttpStatus.BAD_REQUEST);
    } else {
      const userSession: ClientSession = await this.userService.getUserModelSession()
        .catch((error) => {
          throw ErrorHandler.throwDefaultInternalServerError(error);
        });

      const bussinessSession: ClientSession = await this._bussinessService.getBussinessModelSession()
        .catch((error) => {
          throw ErrorHandler.throwDefaultInternalServerError(error);
        });

      userSession.startTransaction();
      bussinessSession.startTransaction();

      let storedUser: UserDto | User = {
        email: user.email,
        password: user.password,
        personalInformation: user.personalInformation,
        identifier: this.getIdentifier(user.bussiness.name),
        role: roleAdmin._id,
        state: "DISPONIBLE",
      }

      let checkIdentifier = await this.userService.checkValidUserBussinessIdentifier(storedUser.identifier, roleAdmin._id)
        .catch(async (error) => {
          await TransactionHandler.abortTransaction(userSession);
          await TransactionHandler.abortTransaction(bussinessSession);
          throw ErrorHandler.throwDefaultInternalServerError(error);
        });

      if (!checkIdentifier) {
        await TransactionHandler.abortTransaction(userSession);
        await TransactionHandler.abortTransaction(bussinessSession);
        throw ErrorHandler.throwCustomError('The bussiness identfier is already taken.', HttpStatus.BAD_REQUEST);
      }

      storedUser = await this.userService.createUser(storedUser, userSession)
        .catch(async (error: any) => {
          await TransactionHandler.abortTransaction(userSession);
          await TransactionHandler.abortTransaction(bussinessSession);
          throw ErrorHandler.throwDefaultInternalServerError(error);
        });

      let storedBussiness: UserBussinessInformationDto | Bussiness = {
        user: storedUser._id,
        serviceEntity: storedUser._id,
        type: 'EMPRESA_MANTENIMIENTO',
        name: user.bussiness.name,
        address: user.bussiness.address,
        engineers: [],
        clenics: [],
        orders: [],
        equipments: []
      }

      storedBussiness = await this._bussinessService.createBussiness(storedBussiness, bussinessSession)
        .catch(async (error: any) => {
          await TransactionHandler.abortTransaction(userSession);
          await TransactionHandler.abortTransaction(bussinessSession);
          throw ErrorHandler.throwDefaultInternalServerError(error);
        });

      storedUser.bussiness = storedBussiness._id;

      storedUser = await storedUser.save({ session: userSession }).catch(async (error: any) => {
        await TransactionHandler.abortTransaction(userSession);
        await TransactionHandler.abortTransaction(bussinessSession);
        throw ErrorHandler.throwDefaultInternalServerError(error);
      });

      if (storedUser && storedBussiness) {
        await TransactionHandler.commitTransaction(userSession);
        await TransactionHandler.commitTransaction(bussinessSession);
        return {
          message: 'Su registro ha sido exitoso. Por favor, inicie sesión para poder continuar'
        }
      } else {
        await TransactionHandler.abortTransaction(userSession);
        await TransactionHandler.abortTransaction(bussinessSession);
        throw ErrorHandler.throwDefaultInternalServerError();
      }
    }
  }

  private getIdentifier(value?: string) {
    let identifier: string = value.toLowerCase().replace(' ', '_');
    return identifier;
  }
}
