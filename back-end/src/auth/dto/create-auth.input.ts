import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAuthInput {
  @Field()
  @IsNotEmpty({message: 'O email deve ser informado'})
  @IsEmail({}, {message: 'Email enválido. Tente novamente'})
  @IsString({message: 'O email deve ser uma string'})
  email: string

  @Field()
  @IsNotEmpty({message: 'A senha deve ser informada'})
  @IsString({message: 'A senha deve ser uma string'})
  password: string
}
