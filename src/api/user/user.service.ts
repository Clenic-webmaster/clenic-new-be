import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/interfaces';
import { UserDto } from 'src/models/dto';
import { hash } from 'bcrypt';


@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().populate('role');
    return users;
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

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).populate('role');
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).populate('role');
    return user;
  }

  async createUser(userDto: UserDto): Promise<User> {
    const toSend: any = userDto;
    toSend.password = await hash(toSend.password, 10);
    const user = new this.userModel(toSend);
    return await user.save();
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(userId);
    return user;
  }
}
