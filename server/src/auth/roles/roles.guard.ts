import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {ROLES_KEY} from "./roles.decorator";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,
                private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (!roles) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
        const token = authHeader.split(' ')[1]

        const user = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
        req.user = user;
        return user.role.some(role => roles.includes(role));
    }
}