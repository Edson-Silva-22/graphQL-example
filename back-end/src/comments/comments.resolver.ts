import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { AuthUser, AuthUserType } from 'src/utils/decorators/auth-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Comment)
  async createComment(@AuthUser() authUser: AuthUserType, @Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return await this.commentsService.createComment(authUser.sub, createCommentInput);
  }

  @Query(() => [Comment])
  async findAllComments(@Args('postId') postId: string) {
    return await this.commentsService.findAllComments(postId);
  }
}
