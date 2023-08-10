import {Types} from "mongoose";

export class TokenDto {
    readonly id: Types.ObjectId
    readonly username: string
    readonly email: string
    readonly role: string[]

    constructor(user) {
        this.id = user._id
        this.username = user.username
        this.email = user.email
        this.role = user.role

    }
}