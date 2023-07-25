import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {User, UserSchema} from "./model/user.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {MailService} from "../mail/mail.service";
import {TokenService} from "../auth/token.service";
import {Token, TokenSchema} from "../auth/model/token.schema";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}])],
    controllers: [UserController],
    providers: [UserService, MailService, TokenService, JwtService],
    exports: [UserService]
})
export class UserModule {
}
