import { CommunitiesBaseDto } from './communities.base.dto';
import { PickType } from '@nestjs/swagger';
import { Communities } from '@prisma/client';

export class CommunitiesInquiryInputDto extends PickType(CommunitiesBaseDto, [
  'id',
] as const) {}

export type CommunitiesInquiryOutputDto = Communities;
