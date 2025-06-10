import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';

@ObjectType()
export class Comment {
  @Field({description: 'Autor do comentário'})
  author: Author

  @Field()
  content: string
  
  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
