import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

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