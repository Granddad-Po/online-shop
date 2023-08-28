import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
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

    @UseGuards(JwtAuthGuard)
    @Patch('count/:id')
    updateCount(@Body() {count}: { count: number },
                @Param('id') partId: ObjectId) {
        return this.shoppingCartService.updateCount(count, partId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('total-price/:id')
    updateTotalPrice(@Body() {total_price}: { total_price: number },
                     @Param('id') partId: ObjectId) {
        return this.shoppingCartService.updateTotalPrice(total_price, partId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('one/:id')
    removeOne(@Param('id') partId: ObjectId) {
        return this.shoppingCartService.remove(partId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('all/:id')
    removeAll(@Param('id') userId: ObjectId) {
        return this.shoppingCartService.removeAll(userId)
    }
}
