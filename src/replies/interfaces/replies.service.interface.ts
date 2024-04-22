import {
  RepliesDeleteInputDto,
  RepliesDeleteOutputDto,
} from '../dtos/replies.delete.dto';
import {
  RepliesRegisterInputDto,
  RepliesRegisterOutputDto,
} from '../dtos/replies.register.dto';
import {
  RepliesUpdateInputDto,
  RepliesUpdateOutputDto,
} from '../dtos/replies.update.dto';

export interface RepliesServiceInterface {
  readonly delete: (
    dto: RepliesDeleteInputDto,
  ) => Promise<RepliesDeleteOutputDto>;

  readonly register: (
    dto: RepliesRegisterInputDto,
  ) => Promise<RepliesRegisterOutputDto>;

  readonly update: (
    dto: RepliesUpdateInputDto,
  ) => Promise<RepliesUpdateOutputDto>;
}
