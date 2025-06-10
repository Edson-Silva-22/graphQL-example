import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/schema/comment.schema';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @Inject(PostsService)
    private readonly postService: PostsService
  ){}

  async createComment(AuthUserId: string, createCommentInput: CreateCommentInput) {
    try {
      const createNewComment = await this.commentModel.create({
        ...createCommentInput,
        author: AuthUserId,
      });

      await this.postService.updatePost({ newCommentId: createNewComment.id, postId: createCommentInput.post })

      return createNewComment.populate('author');
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Devido a um erro interno, não foi possível criar o comentário.')
    }
  }

  async findAllComments(postId: string) {
    try {
      const findComments = await this.commentModel.find({ post: postId }).populate('author');
      return findComments;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Devido a um erro interno, não foi possível listar os comentários.')
    }
  }
}
