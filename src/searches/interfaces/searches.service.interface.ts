import {
  SearchesAddSearchInputDto,
  SearchesAddSearchOutputDto,
} from '../dtos/searches.add.search.dto';
import { SearchesGetTopSearchOutputDto } from '../dtos/searches.get.top.search.dto';
import {
  SearchesGetSearchBoardsInputDto,
  SearchesGetSearchBoardsOutputDto,
} from '../dtos/searches.get.search.boards.dto';
import {
  SearchesGetSearchCommunitiesInputDto,
  SearchesGetSearchCommunitiesOutputDto,
} from '../dtos/searches.get.search.communities.dto';
import {
  SearchesGetSearchMediaInputDto,
  SearchesGetSearchMediaOutputDto,
} from '../dtos/searches.get.search.media.dto';
import {
  SearchesGetSearchPeopleInputDto,
  SearchesGetSearchPeopleOutputDto,
} from '../dtos/searches.get.search.people.dto';
import {
  SearchesGetSearchCommentsInputDto,
  SearchesGetSearchCommentsOutputDto,
} from '../dtos/searches.get.search.comments.dto';
import {
  SearchesGetSearchCommunitiesNameInputDto,
  SearchesGetSearchCommunitiesNameOutputDto,
} from '../dtos/searches.get.search.communities.name.dto';

export interface SearchesServiceInterface {
  readonly addSearch: (
    dto: SearchesAddSearchInputDto,
  ) => Promise<SearchesAddSearchOutputDto>;

  readonly getTopSearch: () => Promise<SearchesGetTopSearchOutputDto>;

  readonly getSearchBoards: (
    dto: SearchesGetSearchBoardsInputDto,
  ) => Promise<SearchesGetSearchBoardsOutputDto>;

  readonly getSearchCommunities: (
    dto: SearchesGetSearchCommunitiesInputDto,
  ) => Promise<SearchesGetSearchCommunitiesOutputDto>;

  readonly getSearchCommunitiesName: (
    dto: SearchesGetSearchCommunitiesNameInputDto,
  ) => Promise<SearchesGetSearchCommunitiesNameOutputDto>;

  readonly getSearchComments: (
    dto: SearchesGetSearchCommentsInputDto,
  ) => Promise<SearchesGetSearchCommentsOutputDto>;

  readonly getSearchMedia: (
    dto: SearchesGetSearchMediaInputDto,
  ) => Promise<SearchesGetSearchMediaOutputDto>;

  readonly getSearchPeople: (
    dto: SearchesGetSearchPeopleInputDto,
  ) => Promise<SearchesGetSearchPeopleOutputDto>;
}
