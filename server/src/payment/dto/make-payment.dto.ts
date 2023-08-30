import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class MakePaymentDto {
    @ApiProperty({example: '10000', description: 'Сумма к оплате'})
    @IsNumber()
    readonly amount: number
}