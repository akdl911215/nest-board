import { Tags } from '@prisma/client';

export interface TagsRepositoryInterface {
  readonly list: () => Promise<Tags[]>;

  readonly register: (entity: { readonly name: Tags['name'] }) => Promise<Tags>;
}
