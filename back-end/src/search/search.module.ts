import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from 'src/schema/author.schema';
import { Post, PostSchema } from 'src/schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema },
      { name: Post.name, schema: PostSchema }
    ])
  ],
  providers: [SearchResolver, SearchService],
})
export class SearchModule {}
