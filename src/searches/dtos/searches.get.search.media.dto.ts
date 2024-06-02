import { PickType } from '@nestjs/swagger';
import { SearchesBaseDto } from './searches.base.dto';
import { Boards } from '@prisma/client';

export class SearchesGetSearchMediaInputDto extends PickType(SearchesBaseDto, [
  'query',
] as const) {}

export type SearchesGetSearchMediaOutputDto = Boards[];
