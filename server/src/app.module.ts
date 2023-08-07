import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {MailingModule} from "./mail/mailing.module";
import {MailerModule} from "@nestjs-modules/mailer";


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
    ],
})
export class AppModule {
}
