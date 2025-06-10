import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsNotEmpty({message: 'O ID do post deve ser informado'})
  @IsString({message: 'O ID do post deve ser uma string'})
  post: string

  @Field()
  @IsNotEmpty({message: 'O conteúdo do comentário deve ser informado'})
  @IsString({message: 'O conteúdo do comentário deve ser uma string'})
  content: string;
}
