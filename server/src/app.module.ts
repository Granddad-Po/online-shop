import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://granddadpo:SwzMV3Jbt3fQ2c0J@online-shop-db.jhm9hol.mongodb.net/'),
        UserModule
    ],
})
export class AppModule {
}
