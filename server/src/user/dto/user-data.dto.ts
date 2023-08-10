import {Types} from "mongoose";

export class UserDataDto {
    readonly user: {
        readonly id: Types.ObjectId
        readonly username: string
        readonly email: string
    }
    readonly accessToken: string
    readonly refreshToken: string
}