import {Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UsePipes} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./auth.guard";
import {ValidateUserDto} from "./dto/validate-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Token} from "./model/token.schema";
import {ValidationPipe} from "../pipes/validation.pipe";


@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiResponse({status: 200, type: Token})
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(@Body() dto: ValidateUserDto) {
        return this.authService.login(dto)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user
    }
}