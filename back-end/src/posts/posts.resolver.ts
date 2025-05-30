import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser, AuthUserType } from 'src/utils/decorators/auth-user.decorator';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async createPost(@AuthUser() authUser: AuthUserType, @Args('createPostInput') createPostInput: CreatePostInput) {
    return await this.postsService.createPost(authUser.sub, createPostInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Post])
  async findAllPosts() {
    return await this.postsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => Post)
  async findOnePost(@Args('id') id: string) {
    return await this.postsService.findOnePost(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return await this.postsService.updatePost(updatePostInput.postId, updatePostInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async removePost(@Args('id') id: string) {
    return await this.postsService.removePost(id);
  }
}
