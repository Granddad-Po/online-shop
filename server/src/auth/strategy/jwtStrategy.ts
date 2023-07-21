import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {Request} from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.fromTokenAsCookies,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    static fromTokenAsCookies(req: Request) {
        return req?.cookies ? req.cookies['auth'] : null
    }
}