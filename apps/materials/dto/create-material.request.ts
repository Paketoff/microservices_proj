import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMaterialRequest {
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsString()
  @IsNotEmpty()
  constructionType: string;
}