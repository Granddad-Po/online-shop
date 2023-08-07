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
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./model/user.schema";


@ApiTags('Пользователи')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 201, type: User})
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

    @ApiOperation({summary: 'Активация аккаунта пользователя'})
    @ApiResponse({status: 200})
    @Get('activate/:link')
    async activate(@Param('link') link: string, @Res() res: Response) {
        await this.userService.activate(link)
        return res.redirect(process.env.CLIENT_URL)
    }

    @ApiOperation({summary: 'Получение списка всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.userService.getAll()
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: ObjectId) {
        return this.userService.delete(id)
    }
}
