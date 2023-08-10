import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SearchByNameDto {
    @ApiProperty({example: 'Bosh', description: 'Полное имя товара'})
    @IsString({message: "Должно быть строкой"})
    name: string
}