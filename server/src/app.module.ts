import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";

const {DB_URL} = require('../config');

@Module({
    imports: [
        MongooseModule.forRoot(DB_URL),
        UserModule,
        AuthModule
    ],
})
export class AppModule {
}
