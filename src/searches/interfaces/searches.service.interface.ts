import {
  SearchesAddSearchInputDto,
  SearchesAddSearchOutputDto,
} from '../dtos/searches.add.search.dto';
import { SearchesGetTopSearchOutputDto } from '../dtos/searches.get.top.search.dto';

export interface SearchesServiceInterface {
  readonly addSearch: (
    dto: SearchesAddSearchInputDto,
  ) => Promise<SearchesAddSearchOutputDto>;

  readonly getTopSearch: () => Promise<SearchesGetTopSearchOutputDto>;
}
