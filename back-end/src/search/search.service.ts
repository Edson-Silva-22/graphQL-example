import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from 'src/schema/author.schema';
import { Post } from 'src/schema/post.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ){}

  async search(searchText: string){
    try {
      const searchInAuthors = await this.authorModel.find({ name: new RegExp(searchText, 'i') })
      const searchInPosts = await this.postModel.find({ content: new RegExp(searchText, 'i') }).populate('author');
      return {
        authors: searchInAuthors,
        posts: searchInPosts,
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
