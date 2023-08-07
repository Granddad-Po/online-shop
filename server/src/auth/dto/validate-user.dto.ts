import {ApiProperty} from "@nestjs/swagger";

export class ValidateUserDto {
    @ApiProperty({example: 'username123', description: 'Имя пользователя'})
    readonly username: string

    @ApiProperty({example: '12345678', description: 'Пароль'})
    readonly password: string
}