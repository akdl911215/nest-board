import { Inject, Injectable } from '@nestjs/common';
import { SearchesServiceInterface } from './interfaces/searches.service.interface';
import { SearchesRepositoryInterface } from './interfaces/searches.repository.interface';
import {
  SearchesAddSearchInputDto,
  SearchesAddSearchOutputDto,
} from './dtos/searches.add.search.dto';
import { SearchesGetTopSearchOutputDto } from './dtos/searches.get.top.search.dto';
import {
  SearchesGetSearchBoardsInputDto,
  SearchesGetSearchBoardsOutputDto,
} from './dtos/searches.get.search.boards.dto';
import {
  SearchesGetSearchCommunitiesInputDto,
  SearchesGetSearchCommunitiesOutputDto,
} from './dtos/searches.get.search.communities.dto';
import {
  SearchesGetSearchMediaInputDto,
  SearchesGetSearchMediaOutputDto,
} from './dtos/searches.get.search.media.dto';
import {
  SearchesGetSearchPeopleInputDto,
  SearchesGetSearchPeopleOutputDto,
} from './dtos/searches.get.search.people.dto';
import {
  SearchesGetSearchCommentsInputDto,
  SearchesGetSearchCommentsOutputDto,
} from './dtos/searches.get.search.comments.dto';
import {
  SearchesGetSearchCommunitiesNameInputDto,
  SearchesGetSearchCommunitiesNameOutputDto,
} from './dtos/searches.get.search.communities.name.dto';

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

  public async getSearchBoards(
    dto: SearchesGetSearchBoardsInputDto,
  ): Promise<SearchesGetSearchBoardsOutputDto> {
    return await this.repository.getSearchBoards(dto);
  }

  public async getSearchCommunities(
    dto: SearchesGetSearchCommunitiesInputDto,
  ): Promise<SearchesGetSearchCommunitiesOutputDto> {
    return await this.repository.getSearchCommunities(dto);
  }

  public async getSearchCommunitiesName(
    dto: SearchesGetSearchCommunitiesNameInputDto,
  ): Promise<SearchesGetSearchCommunitiesNameOutputDto> {
    return await this.repository.getSearchCommunitiesName(dto);
  }

  public async getSearchMedia(
    dto: SearchesGetSearchMediaInputDto,
  ): Promise<SearchesGetSearchMediaOutputDto> {
    return await this.repository.getSearchMedia(dto);
  }

  public async getSearchPeople(
    dto: SearchesGetSearchPeopleInputDto,
  ): Promise<SearchesGetSearchPeopleOutputDto> {
    return await this.repository.getSearchPeople(dto);
  }

  public async getSearchComments(
    dto: SearchesGetSearchCommentsInputDto,
  ): Promise<SearchesGetSearchCommentsOutputDto> {
    return await this.repository.getSearchComments(dto);
  }
}
