import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {MailingModule} from "./mail/mailing.module";
import {MailerModule} from "@nestjs-modules/mailer";
import { ProductPartsModule } from './product-parts/product-parts.module';
import {ShoppingCartModule} from "./shopping-cart/shopping-cart.module";
import { PaymentModule } from './payment/payment.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DB_URL),
        AuthModule,
        UserModule,
        MailingModule,
        MailerModule.forRoot({
            transport: 'smtps://user@domain.com:pass@smtp.domain.com'
        }),
        ProductPartsModule,
        ShoppingCartModule,
        PaymentModule
    ],
})
export class AppModule {
}
