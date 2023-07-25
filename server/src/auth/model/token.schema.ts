import {HydratedDocument, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';


export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
    @Prop({ref: 'User'})
    user: Types.ObjectId
    
    @Prop({required: true})
    refreshToken: string

    
}

export const UserSchema = SchemaFactory.createForClass(Token)