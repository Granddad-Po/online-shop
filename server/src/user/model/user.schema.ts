import {HydratedDocument} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from "@nestjs/swagger";


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
    @Prop([String])
    role: string[]

    @ApiProperty({example: 'false', description: 'Индикатор активации аккаунта'})
    @Prop({default: false})
    isActivated: boolean

    @ApiProperty({example: '21bk3-j23k4k-jb23', description: 'Ссылка для активации аккаунта'})
    @Prop()
    activationLink: string
}

export const UserSchema = SchemaFactory.createForClass(User)