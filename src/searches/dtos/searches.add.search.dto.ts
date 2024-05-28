import { SearchesBaseDto } from './searches.base.dto';
import { PickType } from '@nestjs/swagger';

export class SearchesAddSearchInputDto extends PickType(SearchesBaseDto, [
  'query',
] as const) {}

export type SearchesAddSearchOutputDto = void;
