import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';

@ObjectType()
export class Post {
  @Field()
  id: string
  
  @Field({ description: 'Autor da publicação' })
  author: Author

  @Field()
  content: string

  @Field(() => Int, { description: 'Quantidade de curtidas' })
  likes: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
