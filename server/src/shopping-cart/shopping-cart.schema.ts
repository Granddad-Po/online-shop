import mongoose, {HydratedDocument} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from "@nestjs/swagger";


export type ShoppingCartDocument = HydratedDocument<ShoppingCart>;

@Schema()
export class ShoppingCart {
    @ApiProperty({example: 'asd342qfasfw', description: 'ID Пользователя'})
    @Prop({required: true})
    userId: mongoose.Schema.Types.ObjectId

    @ApiProperty({example: 'asd342qfasfw', description: 'ID Товара'})
    @Prop({required: true})
    partId: mongoose.Schema.Types.ObjectId

    @ApiProperty({example: 'Samsung', description: 'Производитель'})
    @Prop({required: true})
    boiler_manufacturer: string

    @ApiProperty({example: '9990', description: 'Цена товара'})
    @Prop({required: true})
    price: number

    @ApiProperty({example: 'Boiler Super 6', description: 'Название товара'})
    @Prop({required: true})
    parts_manufacturer: string

    @ApiProperty({example: 'Super Backet', description: 'Имя товара'})
    @Prop({required: true})
    name: string

    @ApiProperty({example: 'image.jpg', description: 'Изображение товара'})
    @Prop({required: true})
    image: string

    @ApiProperty({example: 10, description: 'Кол-во товара в наличии'})
    @Prop({required: true, default: 0})
    in_stock: number

    @ApiProperty({example: true, description: 'Количество товаров'})
    @Prop({required: true, default: 0})
    count: number

    @ApiProperty({example: 14500, description: 'Итоговая сумма к оплате'})
    @Prop({required: true, default: 0})
    total_price: number
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart)