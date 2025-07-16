import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from 'src/schema/author.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
    private jwtService: JwtService
  ){}

  async login(createAuthInput: CreateAuthInput) {
    try {
      const finduser = await this.authorModel.findOne({email: createAuthInput.email})
      if (!finduser) throw new BadRequestException('Usuário não encontrado')

      const comparePassword = await bcrypt.compare(createAuthInput.password, finduser.password)
      if (!comparePassword) throw new BadRequestException('Senha ou email incorretos')
      
      const payload = { sub: finduser._id, username: finduser.name }
      return {
        token: await this.jwtService.signAsync(payload)
      }
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Devido a um erro interno, não foi possível realizar o login')
    }
  }
}
