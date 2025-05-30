import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schema/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ){}

  async createPost(authUserId: string, createPostInput: CreatePostInput) {
    try {
      const createNewPost = await this.postModel.create({
        content: createPostInput.content,
        author: authUserId,
      });
      return createNewPost.populate('author');
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Devido a um erro interno, não foi possível criar o post')
    }
  }

  async findAll() {
    try {
      const findAllPosts = await this.postModel.find().populate('author');
      return findAllPosts;
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Devido a um erro interno, não foi possível listar os posts')
    }
  }

  async findOnePost(id: string) {
    try {
      const findOnePost = await this.postModel.findById(id).populate('author');
      if (!findOnePost) throw new BadRequestException('Post não encontrado')
      return findOnePost;
    } catch (error) {
      console.error(error)
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Devido a um erro interno, não foi possível encotrar o post')
    }
  }

  async updatePost(id: string, updatePostInput: UpdatePostInput) {
    try {
      const postIsExit = await this.postModel.findById(id);
      if (!postIsExit) throw new BadRequestException('Post não encontrado')
      const updatePost = await this.postModel.findByIdAndUpdate(id, updatePostInput, { new: true });
      return updatePost;
    } catch (error) {
      console.error(error)
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException('Devido a um erro interno, não foi possível atualizar o post')
    }
  }

  async removePost(id: string) {
    try {
      const removePost = await this.postModel.findByIdAndDelete(id);
      if (!removePost) throw new BadRequestException('Post não encontrado')
      return 'Post removido com sucesso';
    } catch (error) {
      console.error(error)
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException('Devido a um erro interno, não foi possível remover o post')
    }
  }
}
