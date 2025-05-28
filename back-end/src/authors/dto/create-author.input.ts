import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @Field()
  @IsNotEmpty({message: 'O nome deve ser informado'})
  @IsString({message: 'O nome deve ser uma string'})
  name: string

  @Field()
  @IsNotEmpty({message: 'O email deve ser informado'})
  @IsEmail({}, {message: 'O email deve ser válido'})
  email: string

  @Field()
  @IsNotEmpty({message: 'A senha deve ser informada'})
  @IsString({message: 'A senha deve ser uma string'})
  password: string
}
