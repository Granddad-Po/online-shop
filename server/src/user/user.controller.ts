import {
    Body,
    Controller, Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Post, Res,
} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {Error, ObjectId} from "mongoose";
import {Response} from "express";
import {UserDataDto} from "./dto/user-data.dto";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('registration')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    createUser(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        try {
            const userData = this.userService.registration(dto)
            if (userData instanceof UserDataDto) {
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            }
            return userData
        } catch (e) {
            return JSON.stringify(e.message)
        }
    }

    @Get()
    getAllUsers() {
        return this.userService.getAll()
    }

    @Delete(':id')
    deleteUser(@Param('id') id: ObjectId) {
        return this.userService.delete(id)
    }
}
