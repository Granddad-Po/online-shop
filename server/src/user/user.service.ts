import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./model/user.schema";
import {Model, ObjectId} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import {MailService} from "../mail/mail.service";
import {TokenService} from "../auth/token.service";
import {TokenDto} from "../auth/dto/token.dto";
import {UserDataDto} from "./dto/user-data.dto";
import {UserExistsException} from "../../exception/user-exists";


@Injectable()

export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private mailService: MailService,
                private tokenService: TokenService) {
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.userModel.findOne({
            username: dto.username
        })
        const existingByEmail = await this.userModel.findOne({
            email: dto.email
        })
        if (candidate) {
            throw new UserExistsException()
        }
        if (existingByEmail) {
            throw new UserExistsException()
        }
        const hashedPassword = await bcrypt.hash(dto.password, 7)
        const activationLink = uuidv4()
        const user = await this.userModel.create({
            username: dto.username,
            password: hashedPassword,
            email: dto.email,
            role: dto.role || "USER",
            activationLink
        })
        await this.mailService.sendActivationMail(dto.email, activationLink)
        const tokenDto = new TokenDto(user)
        const tokens = await this.tokenService.generateTokens({...tokenDto})
        await this.tokenService.saveToken(tokenDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: tokenDto
        }
    }

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find()
        return users
    }

    async delete(id: ObjectId): Promise<string | { warningMessage: string }> {
        try {
            const user = await this.userModel.findByIdAndDelete(id)
            return `Пользователь с ${user._id} был успешо удален.`
        } catch (e) {
            return {warningMessage: 'Не удалось найти пользователя с таким ID'}
        }
    }
}
