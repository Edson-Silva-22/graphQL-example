import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI!),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql')
    }),
    AuthorsModule,
    PostsModule,
    AuthModule,
    SearchModule,
    CommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
