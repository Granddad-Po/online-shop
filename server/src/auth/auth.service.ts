import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ValidateUserDto} from "./dto/validate-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../user/model/user.schema";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';
import {Token} from "./model/token.schema";
import {TokenService} from "./token.service";


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(Token.name) private tokenModel: Model<Token>,
                private tokenService: TokenService
                ) {
    }

    async validateUser(dto: ValidateUserDto): Promise<User> {
        const user = await this.userModel.findOne({username: dto.username})
        const passwordValid = await bcrypt.compare(dto.password, user.password)

        if (user && passwordValid) {
            return user
        }
        
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }

    async login(dto: ValidateUserDto) {
        const user = await this.validateUser(dto)
        return this.tokenService.generateTokens(user)
    }
}