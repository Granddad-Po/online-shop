import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'username123', description: 'Имя пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly username: string

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 24, {message: 'Не меньше 4 и не больше 24'})
    readonly password: string

    @ApiProperty({example: 'user@email.com', description: 'Почтовый адрес'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string
}