import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {JwtAuthGuard} from "./auth.guard";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/model/user.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || "RANDOM_SECRET_KEY",
            signOptions: {expiresIn: '1h'}
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    exports: [AuthService, JwtAuthGuard]
})

export class AuthModule {

}
