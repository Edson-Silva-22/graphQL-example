import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Author extends Document {
  @Prop({required: true})
  name: string

  @Prop({required: true})
  email: string

  @Prop({required: true})
  password: string
}

export const AuthorSchema = SchemaFactory.createForClass(Author);