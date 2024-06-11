import { PickType } from '@nestjs/swagger';
import { CommunityTagsBaseDto } from './community.tags.base.dto';

export class CommunityTagsDeleteInputDto extends PickType(
  CommunityTagsBaseDto,
  ['tagId', 'communityId'] as const,
) {}

export type CommunityTagsDeleteOutputDto = { readonly remove_tags: boolean };
