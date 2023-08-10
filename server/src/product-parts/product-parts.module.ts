import { Module } from '@nestjs/common';
import { ProductPartsController } from './product-parts.controller';
import { ProductPartsService } from './product-parts.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "./product-parts.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),],
  controllers: [ProductPartsController],
  providers: [ProductPartsService],
  exports: [ProductPartsService]
})
export class ProductPartsModule {}
