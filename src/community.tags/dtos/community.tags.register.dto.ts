import { PickType } from '@nestjs/swagger';
import { CommunityTagsBaseDto } from './community.tags.base.dto';
import { CommunitiesTags } from '@prisma/client';

export class CommunityTagsRegisterInputDto extends PickType(
  CommunityTagsBaseDto,
  ['communityId', 'tags'] as const,
) {}

export type CommunityTagsRegisterOutputDto = CommunitiesTags[];
