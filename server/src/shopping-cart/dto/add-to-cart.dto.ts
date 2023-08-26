import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";
import {ObjectId} from "mongoose";

export class AddToCartDto {
    @ApiProperty({example: 'IvanPopov', description: 'Имя пользователя'})
    @IsString({message: "Должно быть строкой"})
    readonly username: string

    @ApiProperty({example: '123sdfj13', description: 'ID пользователя'})
    @IsOptional()
    readonly cartId?: ObjectId

    @ApiProperty({example: '13ljnlas21', description: 'ID товара'})
    readonly partId: ObjectId
}