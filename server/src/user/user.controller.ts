import {
    Body,
    Controller, Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param, ParseUUIDPipe,
    Post,
} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ObjectId} from "mongoose";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }
    
    @Get(':idOrEmail')
    findOneUser(@Param('idOrEmail') idOrEmail: ObjectId | string) {
        return this.userService.findOne(idOrEmail)
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
