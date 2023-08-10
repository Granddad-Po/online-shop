import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: 'asd8582378sad', description: 'ID пользователя'})
    @IsString({message: "Должно быть строкой"})
    readonly userId: string

    @ApiProperty({example: 'USER | ADMIN', description: 'Значение роли'})
    @IsString({message: `Должно быть строкой "ADMIN"`})
    readonly value: string
}