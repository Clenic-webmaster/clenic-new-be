import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { User } from 'src/models/interfaces';
import { EngineerLocationDto, UserDto } from 'src/models/dto';
import { hash } from 'bcrypt';

//import { ErrorHandler } from 'src/utils/errors';


@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
  }

  async getUserModelSession(): Promise<ClientSession> {
    const session = await this.userModel.db.startSession()
    return session;
  }

  async checkValidAdminCredentials(email: string, identifier: string, roleId: string): Promise<boolean> {
    const users = await this.userModel.find({ email, identifier, role: roleId })
    if (users.length > 0) {
      return false
    }
    return true;
  }

  async checkValidLowUserCredentials(email: string, companyIdentifier: string): Promise<boolean> {
    const users = await this.userModel.find({ email, companyIdentifier })
    if (users.length > 0) {
      throw new HttpException({
        message: 'El email ya se encuentra en uso dentro de su empresa.',
        statusCode: HttpStatus.BAD_REQUEST
      }, HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  async checkValidClenicIdentifier(identifier: string, companyIdentifier: string): Promise<boolean> {
    const users = await this.userModel.find({ identifier, companyIdentifier })
    if (users.length > 0) {
      throw new HttpException({
        message: 'El nombre de la Clenic ya se encuentra en uso dentro de su empresa.',
        statusCode: HttpStatus.BAD_REQUEST
      }, HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  async checkValidUserBussinessIdentifier(identifier: string, roleId: string): Promise<boolean> {
    const users = await this.userModel.find({ identifier, role: roleId })
    if (users.length > 0) {
      return false
    }
    return true;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).populate('role')
      .catch((error) => {
        throw new HttpException({
          message: 'An error has occurred, please contact your administrator.',
          error
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      })
    return user;
  }

  async getUserByCompanyIdentifier(companyIdentifier: string): Promise<User[]> {
    const users = await this.userModel.find({ companyIdentifier });
    return users;
  }

  async getUserByIdAndCompanyIdentifier(userId: string, companyIdentifier: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: userId, companyIdentifier });
    return user;
  }

  async getUserByEmailAndCompanyIdentifier(email: string, companyIdentifier: string): Promise<User> {
    const user = await this.userModel.findOne({ email, companyIdentifier }).populate('role').populate('bussiness');
    return user;
  }

  async getUserByEmailAndRole(email: string, roleId: string): Promise<User> {
    const user = await this.userModel.findOne({ email, role: roleId }).populate('role');
    return user;
  }

  async createUser(userDto: UserDto, session?: ClientSession): Promise<User> {
    const toSend: any = userDto;
    toSend.password = await hash(toSend.password, 10);
    const user = new this.userModel(toSend);
    if (session) {
      return await user.save({ session });
    }
    return await user.save();
  }

  async updateUserLocation(location: EngineerLocationDto, userId: string): Promise<any> {
    const user = await this.getUserById(userId);
    if (user) {
      user.position.lat = location.lat;
      user.position.long = location.long;
      await user.save();
      return {
        message: "Posición actualizada con éxito"
      }
    } else {
      throw new HttpException({
        message: 'An error has occurred, please contact your administrator.'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      //throw ErrorHandler.throwNotFoundError("User");
    }
  }

  async getEngineersLocation(companyIdentifier: string): Promise<any> {
    const users = await this.getUserByCompanyIdentifier(companyIdentifier);
    var positionList = [];
    if (users.length) {
      users.forEach((element) => {
        if (!element.bussiness) { //SI NO TIENE BUSSINESS ES UN INGENIERO
          positionList.push({
            userId: element._id,
            firstName: element.personalInformation.firstName,
            lastName: element.personalInformation.lastName,
            position: element.position
          })
        }
      })
      return positionList;
    } else {
      throw new HttpException({
        message: 'An error has occurred, please contact your administrator.'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      //throw ErrorHandler.throwCustomError('No se encontraron ingenieros.', HttpStatus.BAD_REQUEST);
    }
  }

  async getEngineerLocationById(userId: string, companyIdentifier: string): Promise<any> {
    const user = await this.getUserByIdAndCompanyIdentifier(userId, companyIdentifier);
    if (user) {
      return {
        position: user.position
      }
    } else {
      throw new HttpException({
        message: 'An error has occurred, please contact your administrator.'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      //throw ErrorHandler.throwCustomError('No se encontró ingeniero.', HttpStatus.BAD_REQUEST);
    }
  }
}
