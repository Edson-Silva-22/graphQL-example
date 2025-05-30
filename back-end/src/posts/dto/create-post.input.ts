import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty({message: 'O id do autor do post deve ser informado'})
  @IsString({message: 'O id do autor do post deve ser uma string'})
  authorId: string

  @Field()
  @IsNotEmpty({message: 'O conteúdo do post deve ser informado'})
  @IsString({message: 'O conteúdo do post deve ser uma string'})
  content: string
}
