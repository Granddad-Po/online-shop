import {Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes} from '@nestjs/common';
import {ProductPartsService} from "./product-parts.service";
import {ProductPartQueryDto} from "./dto/product-part-query.dto";
import {JwtAuthGuard} from "../auth/auth.guard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "./product-parts.schema";
import {ObjectId} from "mongoose";
import {ValidationPipe} from "../pipes/validation.pipe";
import {SearchProductDto} from "./dto/search-product.dto";
import {SearchByNameDto} from "./dto/search-by-name.dto";


@ApiTags('Продукты')
@Controller('product-parts')
export class ProductPartsController {
    constructor(private readonly productPartsService: ProductPartsService) {
    }
    
    @ApiOperation({summary: 'Выдача страниц с товарами'})
    @ApiResponse({status: 200, type: [Product]})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Get()
    paginatedAndFilter(@Query() dto: ProductPartQueryDto) {
        return this.productPartsService.paginateAndFilter(dto)
    }

    @ApiOperation({summary: 'Найти товар по ID'})
    @ApiResponse({status: 200, type: Product})
    @UseGuards(JwtAuthGuard)
    @Get('find/:id')
    getOne(@Param('id') id: ObjectId) {
        return this.productPartsService.findOne(id)
    }

    @ApiOperation({summary: 'Получить все бестселлеры'})
    @ApiResponse({status: 200, type: [Product]})
    @UseGuards(JwtAuthGuard)
    @Get('bestsellers')
    getBestsellers() {
        return this.productPartsService.bestsellers()
    }

    @ApiOperation({summary: 'Получить все новинки'})
    @ApiResponse({status: 200, type: [Product]})
    @UseGuards(JwtAuthGuard)
    @Get('news')
    getNews() {
        return this.productPartsService.new()
    }

    @ApiOperation({summary: 'Получить товар по совпадению в имени'})
    @ApiResponse({status: 200, type: [Product]})
    @UseGuards(JwtAuthGuard)
    @Post('search')
    search(@Body() dto: SearchProductDto) {
        return this.productPartsService.searchByString(dto)
    }

    @ApiOperation({summary: 'Найти товар по полному названию'})
    @ApiResponse({status: 200, type: [Product]})
    @UseGuards(JwtAuthGuard)
    @Post('name')
    getByName(@Body() dto: SearchByNameDto) {
        return this.productPartsService.findOneByName(dto)
    }
}
