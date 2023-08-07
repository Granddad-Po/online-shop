import {Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./auth.guard";
import {ValidateUserDto} from "./dto/validate-user.dto";
import {Response} from "express";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    // @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
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