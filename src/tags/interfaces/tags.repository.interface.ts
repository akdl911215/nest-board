import { Tags } from '@prisma/client';

export interface TagsRepositoryInterface {
  readonly list: () => Promise<Tags[]>;
}
