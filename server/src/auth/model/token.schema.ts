import mongoose, {HydratedDocument} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from "../../user/model/user.schema";
import {ApiProperty} from "@nestjs/swagger";


export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
    @ApiProperty({example: '234knjk2363k4j', description: 'ID пользователя'})
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @ApiProperty({example: 'nsdnk3n45jl3blsbdfk...', description: 'Рефреш токен пользователя'})
    @Prop({required: true})
    refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)