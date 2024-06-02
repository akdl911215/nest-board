import { SearchesBaseDto } from '../dtos/searches.base.dto';
import { Boards, Categories, Users } from '@prisma/client';

export interface SearchesRepositoryInterface {
  readonly addSearch: (entity: {
    readonly query: SearchesBaseDto['query'];
  }) => Promise<void>;

  readonly getTopSearch: () => Promise<
    {
      readonly query: SearchesBaseDto['query'];
      readonly count: SearchesBaseDto['count'];
    }[]
  >;

  readonly getSearchBoards: (entity: {
    readonly query: string;
  }) => Promise<Boards[]>;

  readonly getSearchCommunities: (entity: {
    readonly query: string;
  }) => Promise<Categories[]>;

  readonly getSearchMedia: (entity: {
    readonly query: string;
  }) => Promise<Boards[]>;

  readonly getSearchPeople: (entity: {
    readonly query: string;
  }) => Promise<Users[]>;
}
