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
}
