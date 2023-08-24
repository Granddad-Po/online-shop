import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/auth.guard";
import {ObjectId} from "mongoose";
import {ShoppingCartService} from "./shopping-cart.service";
import {AddToCartDto} from "./dto/add-to-cart.dto";

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private shoppingCartService: ShoppingCartService) {
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getAll(@Param('id') userId: ObjectId) {
        return this.shoppingCartService.findAll(userId)
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('add')
    addToCart(@Body() dto: AddToCartDto) {
        return this.shoppingCartService.add(dto)
    }
}
