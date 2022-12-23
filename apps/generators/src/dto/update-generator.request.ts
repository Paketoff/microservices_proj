import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class UpdateGeneratorRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  power: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsPositive()
  weight: number;

  @IsPositive()
  voltage: number;
}