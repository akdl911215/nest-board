import { TagsListOutputDto } from '../dtos/tags.list.dto';

export interface TagsServiceInterface {
  readonly list: () => Promise<TagsListOutputDto>;
}
