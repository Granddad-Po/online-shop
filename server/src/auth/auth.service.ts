import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../user/user.schema";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {LoginUserDto} from "../user/dto/login-user.dto";

const generateAccessToken = (id, username, role) => {
    const payload = {
        id,
        username,
        role
    }
    return jwt.sign(payload, 'Random', {expiresIn: '24h'})
}

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async validateUser(dto: LoginUserDto): Promise<string | UnauthorizedException> {
        const user = await this.userModel.findOne({
            username: dto.username
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const passwordValid = await bcrypt.compare(dto.password, user.password)

        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }
        
        if (user && passwordValid) {
            const token = generateAccessToken(user._id, user.username, user.role)
            return token
        }
    }
}
