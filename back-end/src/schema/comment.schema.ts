import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({timestamps: true})
export class Comment extends Document {
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Post'
  })
  post: string

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Author'
  })
  author: string

  @Prop({
    required: true,
    type: String
  })
  content: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment);