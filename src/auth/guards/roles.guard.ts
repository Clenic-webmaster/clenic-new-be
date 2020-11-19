import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JWTPayloadDto } from 'src/models/dto';
import { ErrorHandler } from 'src/utils/errors';
import { UserService } from 'src/api/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private _userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: JWTPayloadDto = request.user;

        const relatedUser: any = await this._userService.getUserById(user.userId);

        if (relatedUser) {
            return this.matchRoles(roles, relatedUser.role.name);
        } else {
            throw ErrorHandler.throwCustomError("No tiene los permisos suficientes para realizar esta acción.", HttpStatus.UNAUTHORIZED);
        }
    }

    matchRoles(roles: string[], userRole: string): boolean {
        if (roles.indexOf(userRole) >= 0) {
            return true;
        }
        throw ErrorHandler.throwCustomError("No tiene los permisos suficientes para realizar esta acción.", HttpStatus.UNAUTHORIZED);
    }
}