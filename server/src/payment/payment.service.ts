import {ForbiddenException, Injectable} from '@nestjs/common';
import {MakePaymentDto} from "./dto/make-payment.dto";
import axios from "axios";

@Injectable()
export class PaymentService {
    async makePayment(dto: MakePaymentDto) {
        try {
            const {data} = await axios({
                method: "POST",
                url: 'https://api.yookassa.ru/v3/payments',
                headers: {
                    'Content-Type': 'application/json',
                    'Idempotence-Key': Date.now()
                },
                auth: {
                    username: '249307',
                    password: 'test_JG42GfGnPTafu7My7BdKIRNYIFSA9yBhwZDibl8l4wQ'
                },
                data: {
                    amount: {
                        value: dto.amount,
                        currency: 'RUB'
                    },
                    capture: true,
                    confirmation: {
                        type: 'redirect',
                        return_url: 'http://localhost:3000/order'
                    },
                    description: 'Заказ №1'
                }
            })
            return data
        } catch (e) {
            throw new ForbiddenException({e})
        }

    }
}
