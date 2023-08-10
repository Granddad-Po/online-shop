import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class ValidateUserDto {
    @ApiProperty({example: 'username123', description: 'Имя пользователя'})
    @IsString({message: "Должно быть строкой"})
    readonly username: string

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 24, {message: 'Не меньше 4 и не больше 24'})
    readonly password: string
}