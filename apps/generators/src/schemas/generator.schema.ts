import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false})
export class Generator extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  power: string;

  @Prop()
  type: string;

  @Prop()
  weight: number;

  @Prop()
  voltage: number;
}

export const GeneratorSchema = SchemaFactory.createForClass(Generator);