import { SearchesBaseDto } from '../dtos/searches.base.dto';

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
}
