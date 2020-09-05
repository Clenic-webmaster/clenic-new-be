import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/models/interfaces';
import { Model, ClientSession } from 'mongoose';
import { RoleDto } from 'src/models/dto';
import { security } from 'src/utils/constants/security';

@Injectable()
export class RoleService {

    constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {
    }

    async getRoleModelSession(): Promise<ClientSession> {
        const session = await this.roleModel.db.startSession()
        return session;
    }

    async getRoleAdmin(): Promise<Role> {
        const roles = await this.roleModel.find({ name: security.roles.ROLE_ADMIN });
        if (roles.length > 0) {
            return roles[0];
        } else {
            throw new HttpException({
                message: 'Role does not exist.'
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async getRoleClenic(): Promise<Role> {
        const roles = await this.roleModel.find({ name: security.roles.ROLE_CLENIC });
        if (roles.length > 0) {
            return roles[0];
        } else {
            throw new HttpException({
                message: 'Role does not exist.'
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async getRoleEngineer(): Promise<Role> {
        const roles = await this.roleModel.find({ name: security.roles.ROLE_ENGINEER });
        if (roles.length > 0) {
            return roles[0];
        } else {
            throw new HttpException({
                message: 'Role does not exist.'
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async getRoleById(roleId: string): Promise<Role> {
        const role = this.roleModel.findById(roleId);
        return role;
    }

    async createRole(roleDto: RoleDto, session?: ClientSession): Promise<Role> {
        const role = new this.roleModel(roleDto);
        return await role.save({ session: session });
    }

}
