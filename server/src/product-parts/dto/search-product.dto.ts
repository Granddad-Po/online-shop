import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class SearchProductDto {
    @ApiProperty({example: 'lorem', description: 'Строка для поиска товаров'})
    @IsString({message: "Должно быть строкой"})
    search: string
}