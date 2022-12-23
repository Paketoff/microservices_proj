import { IsMongoId, IsNotEmpty } from 'class-validator';
import { IsPositive } from 'class-validator';
import { IsPhoneNumber } from 'class-validator';
import { IsString } from 'class-validator';

export class UpdateOrderRequest {

  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsPhoneNumber()
  phoneNumber: string;
}