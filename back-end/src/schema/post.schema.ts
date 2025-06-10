import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({timestamps: true})
export class Post extends Document {
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Author',
  })
  author: string

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'Comment',
    default: []
  })
  comments: string[]

  @Prop({
    required: true,
    type: String,
  })
  content: string

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  likes: number
}

export const PostSchema = SchemaFactory.createForClass(Post);