import { PickType } from '@nestjs/swagger';
import { CommunitiesTags } from '@prisma/client';
import { CommunityTagsBaseDto } from './community.tags.base.dto';

export class CommunityTagsInquiryInputDto extends PickType(
  CommunityTagsBaseDto,
  ['tagId', 'communityId'] as const,
) {}

export type CommunityTagsInquiryOutputDto = CommunitiesTags[];
