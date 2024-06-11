import { CommunitiesTags } from '@prisma/client';
import { CommunityTagsBaseDto } from '../dtos/community.tags.base.dto';

export interface CommunityTagsRepositoryInterface {
  readonly delete: (entity: {
    readonly tag_id: CommunitiesTags['tag_id'];
    readonly community_id: CommunitiesTags['community_id'];
  }) => Promise<{ readonly remove_tags: boolean }>;

  readonly inquiry: (entity: {
    readonly tag_id: CommunitiesTags['tag_id'];
    readonly community_id: CommunitiesTags['community_id'];
  }) => Promise<CommunitiesTags[]>;

  readonly register: (entity: {
    readonly community_id: CommunitiesTags['community_id'];
    readonly tags: CommunityTagsBaseDto['tags'];
  }) => Promise<CommunitiesTags[]>;
}
