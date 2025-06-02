import { Field, ObjectType } from "@nestjs/graphql";
import { Author } from "src/authors/entities/author.entity";
import { Post } from "src/posts/entities/post.entity";

@ObjectType()
export class Search {
  @Field(() => [Author])
  authors: Author[];

  @Field(() => [Post])
  posts: Post[];
}