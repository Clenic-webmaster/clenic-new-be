import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JWTPayloadDto } from 'src/models/dto';
import { RoleService } from 'src/api/role/role.service';
import { Role } from 'src/models/interfaces';
import { ErrorHandler } from 'src/utils/errors';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private _roleService: RoleService) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.matchRoles(roles, user.role.name);
    }

    matchRoles(roles: string[], userRole: string): boolean {
        if (roles.indexOf(userRole) >= 0) {
            return true;
        }
        throw new UnauthorizedException("No tiene los permisos suficientes para realizar esta acción.");
    }
}