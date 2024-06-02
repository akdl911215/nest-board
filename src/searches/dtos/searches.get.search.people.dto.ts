import { SearchesBaseDto } from './searches.base.dto';
import { PickType } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class SearchesGetSearchPeopleInputDto extends PickType(SearchesBaseDto, [
  'query',
] as const) {}

export type SearchesGetSearchPeopleOutputDto = Users[];
