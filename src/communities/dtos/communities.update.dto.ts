import { PickType } from '@nestjs/swagger';
import { CommunitiesBaseDto } from './communities.base.dto';
import { Communities } from '@prisma/client';

export class CommunitiesUpdateInputDto extends PickType(CommunitiesBaseDto, [
  'id',
  'name',
  'description',
  'icon',
  'banner',
] as const) {}

export type CommunitiesUpdateOutputDto = Communities;
