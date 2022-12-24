import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({versionKey: false})
export class Material extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  type: string;

  @Prop()
  amount: number;

  @Prop()
  weight: number;

  @Prop()
  constructionType: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);