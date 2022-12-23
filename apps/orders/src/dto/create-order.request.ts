import { User } from 'apps/auth/src/users/schemas/user.schema';
import { Exclude } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsObject } from 'class-validator';
import { IsPositive } from 'class-validator';
import { IsPhoneNumber } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber()
  phoneNumber: string;

  user: User[];
}