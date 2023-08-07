import {IsNotEmpty} from "class-validator"; // Не работает, надо проверить
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'username123', description: 'Имя пользователя'})
    @IsNotEmpty()
    readonly username: string

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @IsNotEmpty()
    readonly password: string

    @ApiProperty({example: 'user@email.com', description: 'Почтовый адрес'})
    @IsNotEmpty()
    readonly email: string

    @ApiProperty({example: 'USER | ADMIN', description: 'Роль пользователя', required: false})
    @IsNotEmpty()
    readonly role?: string
}