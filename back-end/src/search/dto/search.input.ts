import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class SearchInput {
  @Field()
  @IsNotEmpty({message: 'O texto de busca deve ser informado'})
  @IsString({message: 'O texto de busca deve ser uma string'})
  searchText: string;
}