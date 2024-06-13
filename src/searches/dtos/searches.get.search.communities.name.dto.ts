import { PickType } from '@nestjs/swagger';
import { SearchesBaseDto } from './searches.base.dto';
import { Communities } from '@prisma/client';

export class SearchesGetSearchCommunitiesNameInputDto extends PickType(
  SearchesBaseDto,
  ['query'] as const,
) {}

export type SearchesGetSearchCommunitiesNameOutputDto = Communities[];
