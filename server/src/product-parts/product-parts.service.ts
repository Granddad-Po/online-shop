import { Injectable } from '@nestjs/common';
import {ProductPartQueryDto} from "./dto/product-part-query.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Product} from "./product-parts.schema";

@Injectable()
export class ProductPartsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    }
    
    async paginateAndFilter(query: ProductPartQueryDto): Promise<Product[]> {
        const limit = Number(query.limit)
        const offset = Number(query.offset)
        const products = await this.productModel.find().skip(offset).limit(limit)
        return products
    }
    
    async bestsellers(): Promise<Product[]> {
        const bestsellers = await this.productModel.find({bestsellers: true})
        return bestsellers
    }

    async new(): Promise<Product[]> {
        const news = await this.productModel.find({new: true})
        return news
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productModel.findById(id)
        return product
    }

    async findOneByName(name: string): Promise<Product> {
        const product = await this.productModel.findOne({name})
        return product
    }

    async searchByString(str: string): Promise<Product[]> {
        const products = await this.productModel.find({$search: str}).limit(20)
        return products
    }
}
