import { Inject, Injectable } from '@nestjs/common';
import { SearchesServiceInterface } from './interfaces/searches.service.interface';
import { SearchesRepositoryInterface } from './interfaces/searches.repository.interface';
import {
  SearchesAddSearchInputDto,
  SearchesAddSearchOutputDto,
} from './dtos/searches.add.search.dto';
import { SearchesGetTopSearchOutputDto } from './dtos/searches.get.top.search.dto';

@Injectable()
export class SearchesService implements SearchesServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: SearchesRepositoryInterface,
  ) {}

  public async addSearch(
    dto: SearchesAddSearchInputDto,
  ): Promise<SearchesAddSearchOutputDto> {
    await this.repository.addSearch(dto);
  }

  public async getTopSearch(): Promise<SearchesGetTopSearchOutputDto> {
    return await this.repository.getTopSearch();
  }
}
