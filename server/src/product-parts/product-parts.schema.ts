import {HydratedDocument} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from "@nestjs/swagger";


export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @ApiProperty({example: 'Samsung', description: 'Производитель'})
    @Prop({required: true})
    boiler_manufacturer: string

    @ApiProperty({example: 8990, description: 'Цена'})
    @Prop({required: true, default: 0})
    price: number

    @ApiProperty({example: 'js12312jsfn...', description: ''})
    @Prop({required: true})
    parts_manufacturer: string

    @ApiProperty({example: '1481278721', description: 'Артикул'})
    @Prop({required: true})
    vendor_code: string

    @ApiProperty({example: 'Boiler Super 6', description: 'Название товара'})
    @Prop({required: true})
    name: string

    @ApiProperty({example: 'Экологичный и надежный', description: 'Описание товара'})
    @Prop({required: true, default: ''})
    description: string

    @ApiProperty({example: ['image.jpg', "image1.jpg"], description: 'Массив изображений товара'})
    @Prop({required: true, default: []})
    images: string[]

    @ApiProperty({example: 10, description: 'Кол-во товара в наличии'})
    @Prop({required: true, default: 0})
    in_stock: number

    @ApiProperty({example: true, description: 'Самый продаваемый товар'})
    @Prop({required: true, default: false})
    bestsellers: boolean

    @ApiProperty({example: true, description: 'Новый товар'})
    @Prop({required: true, default: false})
    new: boolean

    @ApiProperty({example: 4, description: 'Популярность товара'})
    @Prop({required: true, default: 0})
    popularity: number

    @ApiProperty({example: 'Boiler Super 7', description: 'Совместимсть товара'})
    @Prop({required: true})
    compatibility: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)