import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Token} from "./model/token.schema";


@Injectable()

export class TokenService {
    constructor(@InjectModel(Token.name) private tokenModel: Model<Token>,
                private jwtService: JwtService) {
    }

    async generateTokens(payload) {
        const noPassword = ({_id, username, email, role}) => ({
            id: _id,
            username,
            email,
            role
        })
        const userData = noPassword(payload)
        const accessToken = this.jwtService.sign(userData, {secret: process.env.JWT_SECRET, expiresIn: '30m'})
        const refreshToken = this.jwtService.sign(userData, {secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await this.tokenModel.create({user: userId, refreshToken})
        return token
    }
}
