import { Order } from 'apps/orders/src/schemas/order.schema';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class CreateUserRequest {
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  // @IsEnum({enum: UserRole})
  role: UserRole = UserRole.USER;

  // @IsArray()
  orders: Order[] = null;

  
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}