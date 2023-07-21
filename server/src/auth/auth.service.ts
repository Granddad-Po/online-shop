import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {AuthUserDto} from "./dto/auth-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../user/user.schema";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private readonly jwtService: JwtService) {
    }

    async auth(dto: AuthUserDto) {
        const user = await this.userModel.findOne({username: dto.username})
        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const passwordValid = await bcrypt.compare(dto.password, user.password)
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        if (user && passwordValid) {
            return this.jwtService.sign({
                id: user._id,
                username: user.username,
                email: user.email
            }, {secret: process.env.JWT_SECRET, expiresIn: '1h'})
        }
    }
}