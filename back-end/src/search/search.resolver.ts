import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Search } from './entities/search.entity';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(AuthGuard)
  @Query(() => Search)
  async search(@Args('searchText', { type: () => String }) searchText: string) {
    return await this.searchService.search(searchText)
  }
}
