import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./model/user.schema";
import {Model, ObjectId} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import {MailingService} from "../mail/mailing.service";
import {TokenService} from "../auth/token.service";
import {TokenDto} from "../auth/dto/token.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {UserDataDto} from "./dto/user-data.dto";


@Injectable()

export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private mailService: MailingService,
                private tokenService: TokenService) {
    }

    async registration(dto: CreateUserDto): Promise<UserDataDto> {
        const candidate = await this.userModel.findOne({
            username: dto.username
        })
        const existingByEmail = await this.userModel.findOne({
            email: dto.email
        })
        if (candidate) {
            throw new Error('Такой пользователь уже зарегистрирован.')
        }
        if (existingByEmail) {
            throw new Error('Такой email уже зарегистрирован.')
        }
        const hashedPassword = await bcrypt.hash(dto.password, 7)
        const activationLink = uuidv4()
        const user = await this.userModel.create({
            username: dto.username,
            password: hashedPassword,
            email: dto.email,
            activationLink
        })
        await this.mailService.sendActivationMail(dto.email, `${process.env.API_URL}/users/activate/${activationLink}`)
        const tokenDto = new TokenDto(user)
        const tokens = await this.tokenService.generateTokens({...tokenDto})
        await this.tokenService.saveToken(tokenDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: tokenDto
        }
    }
    
    async activate(activationLink) {
        const user = await this.userModel.findOne({activationLink})
        if (!user) {
            throw new Error('Неккоректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find()
        return users
    }

    async delete(id: ObjectId): Promise<string | { warningMessage: string }> {
        try {
            const user = await this.userModel.findByIdAndDelete(id)
            return `Пользователь ${user.username} был успешно удален.`
        } catch (e) {
            throw new Error('Не удалось найти пользователя с таким ID')
        }
    }
    
    async addRole(dto: AddRoleDto) {
        const user = await this.userModel.findById(dto.userId)
        if (!user) {
            throw new Error('Не удалось найти пользователя с таким ID.')
        }
        const duplicate = user.role.some(role => role === dto.value)
        if (duplicate) {
            throw new Error(`Пользователь ${user.username} уже имеет роль ${dto.value}.`)
        }
        user.role.push(dto.value)
        await user.save()
        return `Пользователю ${user.username} была успешно выдана роль ${dto.value}.`
    }
}
