import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author)
  async createAuthor(@Args('createAuthorInput') createAuthorInput: CreateAuthorInput) {
    return await this.authorsService.createAuthor(createAuthorInput);
  }

  @Query(() => [Author])
  async findAllAuthors() {
    return await this.authorsService.findAllAuthors();
  }

  @Query(() => Author)
  async findOneAuthor(@Args('id') id: string) {
    return await this.authorsService.findOneAuthor(id);
  }

  @Mutation(() => Author)
  async updateAuthor(@Args('authorID') authorId: string, @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput) {
    return await this.authorsService.updateAuthor(authorId, updateAuthorInput);
  }

  @Mutation(() => String)
  async removeAuthor(@Args('id') id: string) {
    return await this.authorsService.removeAuthor(id);
  }
}
