import { TagsListOutputDto } from '../dtos/tags.list.dto';
import {
  TagsRegisterInputDto,
  TagsRegisterOutputDto,
} from '../dtos/tags.register.dto';

export interface TagsServiceInterface {
  readonly list: () => Promise<TagsListOutputDto>;

  readonly register: (
    dto: TagsRegisterInputDto,
  ) => Promise<TagsRegisterOutputDto>;
}
