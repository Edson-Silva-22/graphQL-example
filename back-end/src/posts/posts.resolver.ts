import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return await this.postsService.createPost(createPostInput);
  }

  @Query(() => [Post])
  async findAllPosts() {
    return await this.postsService.findAll();
  }

  @Query(() => Post)
  async findOnePost(@Args('id') id: string) {
    return await this.postsService.findOnePost(id);
  }

  @Mutation(() => Post)
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return await this.postsService.updatePost(updatePostInput.postId, updatePostInput);
  }

  @Mutation(() => String)
  async removePost(@Args('id') id: string) {
    return await this.postsService.removePost(id);
  }
}
