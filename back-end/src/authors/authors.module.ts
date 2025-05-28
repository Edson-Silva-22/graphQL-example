import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from 'src/schema/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema}
    ])
  ],
  providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
