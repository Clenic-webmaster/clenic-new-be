import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ClientSession, Connection } from 'mongoose';
import { User, Role } from 'src/models/interfaces';
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

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().populate('role');
    return users;
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

  async updateUserBusiness(user: UserDto, session: ClientSession): Promise<User> {
    const myUser = await this.userModel.findByIdAndUpdate(user._id, { bussiness: user.bussiness }, { session })
      .catch((error) => {
        throw ErrorHandler.throwDefaultInternalServerError(error);
      })
    return myUser;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).populate('role');
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).populate('role');
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
