import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Product} from "../product-parts/product-parts.schema";
import {Model, ObjectId} from "mongoose";
import {ShoppingCart} from "./shopping-cart.schema";
import {AddToCartDto} from "./dto/add-to-cart.dto";
import {User} from "../user/model/user.schema";

@Injectable()
export class ShoppingCartService {
    constructor(@InjectModel(Product.name) private productPartsModel: Model<Product>,
                @InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCart>) {}
    
    async findAll(userId: ObjectId): Promise<ShoppingCart[]> {
        const products = await this.shoppingCartModel.find({userId})
        return products
    }
    
    async add(dto: AddToCartDto): Promise<ShoppingCart> {
        const user = await this.userModel.findOne({username: dto.username})
        const part = await this.productPartsModel.findById(dto.partId)
        const cart = await this.shoppingCartModel.create({
            userId: user._id,
            partId: part._id,
            boiler_manufacturer: part.boiler_manufacturer,
            parts_manufacturer: part.parts_manufacturer,
            price: part.price,
            in_stock: part.in_stock,
            image: part.images[0],
            name: part.name,
            total_price: part.price,
            count: 0
        })
        return cart
    }
    
    async updateCount(count: number, partId: ObjectId): Promise<number> {
        await this.shoppingCartModel.findOneAndUpdate({partId}, {count: count})
        const part = await this.shoppingCartModel.findOne({partId})
        return part.count
    }

    async updateTotalPrice(total_price: number, partId: ObjectId): Promise<number> {
        await this.shoppingCartModel.findOneAndUpdate({partId}, {total_price: total_price})
        const part = await this.shoppingCartModel.findOne({partId})
        return part.total_price
    }

    async remove(partId: ObjectId): Promise<void> {
        await this.shoppingCartModel.findOne({partId})
    }

    async removeAll(userId: ObjectId): Promise<void> {
        await this.shoppingCartModel.deleteMany({userId})
    }
}
