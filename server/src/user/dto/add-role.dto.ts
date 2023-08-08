import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: 'asd8582378sad', description: 'ID пользователя'})
    @IsNotEmpty()
    readonly userId: string

    @ApiProperty({example: 'USER | ADMIN', description: 'Значение роли'})
    readonly value: string
}