import { PickType } from '@nestjs/swagger';
import { SearchesBaseDto } from './searches.base.dto';
import { Comments } from '@prisma/client';

export class SearchesGetSearchCommentsInputDto extends PickType(
  SearchesBaseDto,
  ['query'] as const,
) {}

export type SearchesGetSearchCommentsOutputDto = Comments[];
