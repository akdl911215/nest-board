import { PickType } from '@nestjs/swagger';
import { CommunitiesBaseDto } from './communities.base.dto';
import { Communities } from '@prisma/client';

export class CommunitiesRegisterInputDto extends PickType(CommunitiesBaseDto, [
  'name',
  'description',
  'banner',
  'icon',
] as const) {}

export type CommunitiesRegisterOutputDto = Communities;
