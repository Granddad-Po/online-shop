import {Types} from "mongoose";

export class TokenDto {
    readonly id: Types.ObjectId
    readonly username: string
    readonly email: string
    readonly isActivated: boolean

    constructor(user) {
        this.id = user._id
        this.username = user.username
        this.email = user.email
        this.isActivated = user.isActivated

    }
}