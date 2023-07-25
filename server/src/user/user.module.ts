import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {User, UserSchema} from "./model/user.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {MailService} from "../mail/mail.service";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService, MailService],
    exports: [UserService]
})
export class UserModule {
}
