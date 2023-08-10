import { Injectable } from '@nestjs/common';
import {ProductPartQueryDto} from "./dto/product-part-query.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Product} from "./product-parts.schema";
import {SearchProductDto} from "./dto/search-product.dto";
import {SearchByNameDto} from "./dto/search-by-name.dto";

@Injectable()
export class ProductPartsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    }
    
    async paginateAndFilter(query: ProductPartQueryDto): Promise<{count: number, rows: Product[]}> {
        const limit = Number(query.limit)
        const offset = Number(query.offset) * limit
        const rows = await this.productModel.find().skip(offset).limit(limit)
        const count = await this.productModel.countDocuments()
        return {count, rows}
    }
    
    async bestsellers(): Promise<{count: number, rows: Product[]}> {
        const rows = await this.productModel.find({bestseller: true})
        const count = await this.productModel.countDocuments({bestseller: true})
        return {count, rows}
    }

    async new(): Promise<{count: number, rows: Product[]}> {
        const rows = await this.productModel.find({new: true})
        const count = await this.productModel.countDocuments({new: true})
        return {count, rows}
    }

    async findOne(id: ObjectId): Promise<Product> {
        const product = await this.productModel.findById(id)
        return product
    }

    async findOneByName(dto: SearchByNameDto): Promise<Product> {
        const product = await this.productModel.findOne({name: dto.name})
        return product
    }

    async searchByString(dto: SearchProductDto): Promise<{count: number, rows: Product[]}> {
        const filter = { name: { $regex: dto.search, $options: 'i' } };
        const rows = await this.productModel.find(filter).limit(20)
        const count = await this.productModel.countDocuments(filter)
        return {count, rows}
    }
}
