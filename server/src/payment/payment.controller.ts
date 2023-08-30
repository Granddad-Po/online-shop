import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {PaymentService} from "./payment.service";
import {JwtAuthGuard} from "../auth/auth.guard";
import {MakePaymentDto} from "./dto/make-payment.dto";

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    makePayment(@Body() dto: MakePaymentDto) {
        return this.paymentService.makePayment(dto)
    }
}
