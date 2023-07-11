import {Body, Controller, Get, Header, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";


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

    @Get()
    getAll() {
        return this.userService.getAll()
    }
}
