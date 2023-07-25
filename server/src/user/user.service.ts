import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./model/user.schema";
import {Model, ObjectId} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import {MailService} from "../mail/mail.service";


@Injectable()

export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private mailService: MailService) {
    }

    async registration(dto: CreateUserDto): Promise<User | Error> {
        const candidate = await this.userModel.findOne({
            username: dto.username
        })
        const existingByEmail = await this.userModel.findOne({
            email: dto.email
        })
        if (candidate) {
            return new Error(`Пользователь с именем ${dto.username} уже существует`)
        }
        if (existingByEmail) {
            return new Error(`Пользователь с почтовым адресом ${dto.email} уже существует`)
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
        return user
    }

    async findOne(idOrEmail: ObjectId | string): Promise<User | string> {
        if (idOrEmail.toString().includes('@')) {
            const userByEmail = await this.userModel.findOne({email: idOrEmail})
            return userByEmail
        } else {
            const userById = await this.userModel.findById(idOrEmail)
            return userById
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
