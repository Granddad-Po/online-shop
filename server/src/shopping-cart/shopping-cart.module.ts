import {Module} from '@nestjs/common';
import {ShoppingCartService} from './shopping-cart.service';
import {ShoppingCartController} from './shopping-cart.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ShoppingCart, ShoppingCartSchema} from "./shopping-cart.schema";
import {Product, ProductSchema} from "../product-parts/product-parts.schema";
import {User, UserSchema} from "../user/model/user.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: ShoppingCart.name, schema: ShoppingCartSchema}]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    ],
    providers: [ShoppingCartService],
    controllers: [ShoppingCartController]
})
export class ShoppingCartModule {
}
