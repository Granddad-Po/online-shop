import {Body, Controller, Get, Post, Res, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthUserDto} from "./dto/auth-user.dto";
import {Response} from "express";
import {JwtAuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/login')
    login(@Body() dto: AuthUserDto, @Res() res: Response): void {
        const token = this.authService.auth(dto)
        res.cookie('auth', token, {maxAge: 3600000})
        res.send('Authorization successful')
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/test')
    test() {
        return 'Все оке'
    }
}
