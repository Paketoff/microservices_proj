import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order } from 'apps/orders/src/schemas/order.schema';
import { Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Schema({ versionKey: false })
export class User extends AbstractDocument {

  @Prop()
  name: string;

  @Prop({unique: true})
  username: string;

  @Prop({default: UserRole.USER})
  role: UserRole;

  @Prop({type: [Types.ObjectId], ref: 'Order'})
  orders: Order[];

  @Prop({unique: true})
  email: string;

  @Prop({required: false})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);