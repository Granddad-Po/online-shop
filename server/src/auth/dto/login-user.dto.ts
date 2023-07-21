import {Types} from "mongoose";

export class LoginUserDto {
    readonly id: Types.ObjectId
    readonly username: string
    readonly email: string
}