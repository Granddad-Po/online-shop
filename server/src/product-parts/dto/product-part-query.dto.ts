import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class ProductPartQueryDto {
    @ApiProperty({example: '20', description: 'Кол-во получаемых объектов'})
    @IsString({message: "Должно быть строкой"})
    limit: string

    @ApiProperty({example: '1', description: 'Номер страницы, начинается с 0'})
    @IsString({message: "Должно быть строкой"})
    offset: string
}