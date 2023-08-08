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
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./model/user.schema";
import {RolesGuard} from "../auth/roles/roles.guard";
import {Roles} from "../auth/roles/roles.decorator";
import {AddRoleDto} from "./dto/add-role.dto";


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
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers() {
        return this.userService.getAll()
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: User})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: ObjectId) {
        return this.userService.delete(id)
    }

    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }
}
