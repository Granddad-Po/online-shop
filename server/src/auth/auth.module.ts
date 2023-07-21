import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy/jwtStrategy";
import {JwtAuthGuard} from "./auth.guard";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/user.schema";


@Module({
    imports: [
        PassportModule.register({
            session: false
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '1h'}
        }),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, JwtAuthGuard, AuthService],
    exports: [AuthService, JwtAuthGuard]
})

export class AuthModule {

}
