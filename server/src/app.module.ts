import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DB_URL),
        AuthModule,
        UserModule,
    ],
})
export class AppModule {
}
