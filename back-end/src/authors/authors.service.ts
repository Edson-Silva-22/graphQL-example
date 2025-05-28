import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from 'src/schema/author.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async createAuthor(createAuthorInput: CreateAuthorInput) {
    try {
      const authorExist = await this.authorModel.findOne({ email: createAuthorInput.email })
      
      if (authorExist) throw new BadRequestException('Autor já cadastrado')

      const newAuthor = await this.authorModel.create(createAuthorInput)
      return newAuthor;

    } catch (error) {
      console.error(error)
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException('Devido ao erro interno, não foi possível cadastrar o autor')
    }
  }

  async findAllAuthors() {
    try {
      const authors = await this.authorModel.find()
      return authors;
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Devido ao erro interno, não foi possível listar os autores')
    }
  }

  async findOneAuthor(id: string) {
    try {
      const findOneAuthor = await this.authorModel.findById(id)
      if (!findOneAuthor) throw new BadRequestException('Autor não encontrado')

      return findOneAuthor 
    } catch (error) {
      console.error(error)
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException('Devido ao erro interno, não foi possível encontrar o autor')
    }
  }

  async updateAuthor(authorId: string, updateAuthorInput: UpdateAuthorInput) {
    try {
      const updateAuthor = await this.authorModel.findByIdAndUpdate(authorId, updateAuthorInput, { new: true })
      if (!updateAuthor) throw new BadRequestException('Autor não encontrado')

      return updateAuthor;
    } catch (error) {
      console.error(error)
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException('Devido ao erro interno, não foi possível atualizar o autor')
    }
  }

  async removeAuthor(id: string) {
    try {
      const removeAuthor = await this.authorModel.findByIdAndDelete(id)
      if (!removeAuthor) throw new BadRequestException('Autor não encontrado')

      return "Autor removido com sucesso";
    } catch (error) {
      console.error(error)
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException('Devido ao erro interno, não foi possível remover o autor')
    }
  }
}
