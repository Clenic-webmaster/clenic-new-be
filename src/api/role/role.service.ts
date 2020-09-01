import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/models/interfaces';
import { Model } from 'mongoose';
import { RoleDto } from 'src/models/dto';

@Injectable()
export class RoleService {

    constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {
    }

    async getRoles(): Promise<Role[]> {
        const roles = this.roleModel.find();
        return roles;
    }

    async getRoleById(roleId: string): Promise<Role> {
        const role = this.roleModel.findById(roleId);
        return role;
    }

    async createRole(roleDto: RoleDto): Promise<Role> {
        const role = new this.roleModel(roleDto);
        return await role.save();
    }

}
