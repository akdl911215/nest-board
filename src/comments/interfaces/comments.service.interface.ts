import {
  CommentsDeleteInputDto,
  CommentsDeleteOutputDto,
} from '../dtos/comments.delete.dto';
import {
  CommentsRegisterInputDto,
  CommentsRegisterOutputDto,
} from '../dtos/comments.register.dto';
import {
  CommentsUpdateInputDto,
  CommentsUpdateOutputDto,
} from '../dtos/comments.update.dto';
import {
  CommentsListInputDto,
  CommentsListOutputDto,
} from '../dtos/comments.list.dto';

export interface CommentsServiceInterface {
  readonly delete: (
    dto: CommentsDeleteInputDto,
  ) => Promise<CommentsDeleteOutputDto>;

  readonly register: (
    dto: CommentsRegisterInputDto,
  ) => Promise<CommentsRegisterOutputDto>;

  readonly update: (
    dto: CommentsUpdateInputDto,
  ) => Promise<CommentsUpdateOutputDto>;

  readonly list: (dto: CommentsListInputDto) => Promise<CommentsListOutputDto>;
}
