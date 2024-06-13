import { PickType } from '@nestjs/swagger';
import { Communities } from '@prisma/client';
import { CommunitiesBaseDto } from './communities.base.dto';

export class CommunitiesGetCommunitiesNameInputDto extends PickType(
  CommunitiesBaseDto,
  ['name'] as const,
) {}

export type CommunitiesGetCommunitiesNameOutputDto = Communities[];
