import {Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./auth.guard";
import {ValidateUserDto} from "./dto/validate-user.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    // @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() dto: ValidateUserDto) {
        const user = await this.authService.validateUser(dto)
        if (user) {
            return this.authService.login(user)
        } else {
            return {message: 'Не удалось залогиниться'}
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user
    }
}