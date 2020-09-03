import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ClientSession, Connection } from 'mongoose';
import { User, Role, Bussiness } from 'src/models/interfaces';
import { UserDto } from 'src/models/dto';
import { hash } from 'bcrypt';
import { ErrorHandler } from 'src/utils/errors';


@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
  }

  async getUserModelSession(): Promise<ClientSession> {
    const session = await this.userModel.db.startSession()
    return session;
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

  async handleValidClenicEmailInBussiness(email: string, companyIdentifier?: string,): Promise<boolean> {
    const users: User[] = await this.userModel.find({ identifier: companyIdentifier }).populate('bussiness.clenics')
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      })
    if (users.length <= 0) {
      throw ErrorHandler.throwNotFoundError('Bussiness');
    }
    const relatedCompany: Bussiness = users[0].bussiness as Bussiness;
    const clenics: User[] = relatedCompany.clenics;
    if (clenics.filter((value) => { return value.email == email; }).length > 0) {
      throw ErrorHandler.throwCustomError('Email is already taken in the company.', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  async handleValidClenicIdentifierInBussiness(clenicIdentifier: string, companyIdentifier?: string,): Promise<boolean> {
    const users: User[] = await this.userModel.find({ identifier: companyIdentifier }).populate('bussiness.clenics')
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      })
    if (users.length <= 0) {
      throw ErrorHandler.throwNotFoundError('Bussiness');
    }
    const relatedCompany: Bussiness = users[0].bussiness as Bussiness;
    const clenics: User[] = relatedCompany.clenics;
    if (clenics.filter((value) => { return value.identifier == clenicIdentifier; }).length > 0) {
      throw ErrorHandler.throwCustomError('The clenic identifier is already taken in the company.', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).populate('role');
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).populate('role').populate('bussiness');
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

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(userId);
    return user;
  }
}
