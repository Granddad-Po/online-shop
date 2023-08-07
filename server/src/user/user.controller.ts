import {
    Body,
    Controller, Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Post, Res, UseGuards,
} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ObjectId} from "mongoose";
import {Response} from "express";
import {JwtAuthGuard} from "../auth/auth.guard";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('registration')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    async createUser(@Body() dto: CreateUserDto, @Res({passthrough: true}) res: Response) {
        const userData = await this.userService.registration(dto)
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false
        })
        return userData
    }
    
    @Get('activate/:link')
    async activate(@Param('link') link: string, @Res() res: Response) {
        await this.userService.activate(link)
        return res.redirect(process.env.CLIENT_URL)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.userService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: ObjectId) {
        return this.userService.delete(id)
    }
}
