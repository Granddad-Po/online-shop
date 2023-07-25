import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./model/user.schema";
import {Model, ObjectId} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()

export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async create(dto: CreateUserDto): Promise<User | { warningMessage: string }> {
        const existingByUserName = await this.userModel.findOne({
            username: dto.username
        })
        const existingByEmail = await this.userModel.findOne({
            email: dto.email
        })
        if (existingByUserName) {
            return {warningMessage: 'Пользователь с таким именем уже существует'}
        }
        if (existingByEmail) {
            return {warningMessage: 'Пользователь с таким email уже существует'}
        }
        const hashedPassword = await bcrypt.hash(dto.password, 7)
        const user = await this.userModel.create({
            username: dto.username,
            password: hashedPassword,
            email: dto.email,
            role: dto.role || "USER"
        })
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

    async delete(id: ObjectId): Promise<string | {warningMessage: string}> {
        try {
            const user = await this.userModel.findByIdAndDelete(id)
            return `Пользователь с ${user._id} был успешо удален.`
        } catch (e) {
            return {warningMessage: 'Не удалось найти пользователя с таким ID'}
        }
    }
}
