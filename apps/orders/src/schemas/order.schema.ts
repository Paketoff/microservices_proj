import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "apps/auth/src/users/schemas/user.schema";
import { Types } from "mongoose";



@Schema({versionKey: false})
export class Order extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop({type: Types.ObjectId, ref: 'User'})
  user: User;
  
}

export const OrderSchema = SchemaFactory.createForClass(Order);