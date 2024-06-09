import { PickType } from '@nestjs/swagger';
import { CommunitiesBaseDto } from './communities.base.dto';
import { Communities } from '@prisma/client';

export class CommunitiesDeleteInputDto extends PickType(CommunitiesBaseDto, [
  'id',
] as const) {}

export type CommunitiesDeleteOutputDto = Communities;
