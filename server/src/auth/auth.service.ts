import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ValidateUserDto} from "./dto/validate-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../user/model/user.schema";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';
import {LoginUserDto} from "./dto/login-user.dto";


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private jwtService: JwtService) {
    }

    async validateUser(dto: ValidateUserDto): Promise<LoginUserDto | null> {
        const user = await this.userModel.findOne({username: dto.username})
        if (!user) {
            return null
        }

        const passwordValid = await bcrypt.compare(dto.password, user.password)
        if (!passwordValid) {
            return null
        }

        if (user && passwordValid) {
            const result = {
                id: user._id,
                username: user.username,
                email: user.email
            }
            return result
        }
    }

    async login({id, username, email}): Promise<{access_token: string}> {
        return {
            access_token: this.jwtService.sign({id, username, email})
        }
    }
}