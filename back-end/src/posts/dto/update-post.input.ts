import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field()
  @IsNotEmpty({message: 'O id do post que será atualizado deve ser informado'})
  @IsString({message: 'O id do post deve ser uma string'})
  postId: string;
}
