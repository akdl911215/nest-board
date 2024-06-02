import { PickType } from '@nestjs/swagger';
import { SearchesBaseDto } from './searches.base.dto';
import { Categories } from '@prisma/client';

export class SearchesGetSearchCommunitiesInputDto extends PickType(
  SearchesBaseDto,
  ['query'] as const,
) {}

export type SearchesGetSearchCommunitiesOutputDto = Categories[];
