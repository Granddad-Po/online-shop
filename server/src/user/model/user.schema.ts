import {HydratedDocument} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    username: string
    
    @Prop({required: true})
    password: string
    
    @Prop({required: true, unique: true})
    email: string
    
    @Prop([String])
    role: string[]

    @Prop({default: false})
    isActivated: boolean

    @Prop()
    activationLink: string
}

export const UserSchema = SchemaFactory.createForClass(User)