import {Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ObjectId} from "mongoose";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.userService.getOne(id)
    }

    @Get()
    getAll() {
        return this.userService.getAll()
    }
}
