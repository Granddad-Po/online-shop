import {HydratedDocument, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from "@nestjs/swagger";
import {ShoppingCart} from "../../shopping-cart/shopping-cart.schema";


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @ApiProperty({example: 'username123', description: 'Имя пользователя'})
    @Prop({required: true, unique: true})
    username: string

    @ApiProperty({example: 'js12312jsfn...', description: 'Захэшированный пароль пользователя'})
    @Prop({required: true})
    password: string

    @ApiProperty({example: 'user@email.com', description: 'Почтовый адрес'})
    @Prop({required: true, unique: true})
    email: string

    @ApiProperty({example: 'USER', description: 'Роль пользователя'})
    @Prop({type: [String], default: ['USER']})
    role: string[]

    @ApiProperty({example: 'false', description: 'Индикатор активации аккаунта'})
    @Prop({default: false})
    isActivated: boolean

    @ApiProperty({example: '21bk3-j23k4k-jb23', description: 'Ссылка для активации аккаунта'})
    @Prop()
    activationLink: string

    @ApiProperty({example: 'automatically', description: 'Корзина пользователя'})
    @Prop({type: Types.ObjectId, ref: 'ShoppingCart'})
    shoppingCart: ShoppingCart
}

export const UserSchema = SchemaFactory.createForClass(User)