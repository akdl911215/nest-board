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
import {
  CommentsInquiryInputDto,
  CommentsInquiryOutputDto,
} from '../dtos/comments.inquiry.dto';

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

  readonly inquiry: (
    dto: CommentsInquiryInputDto,
  ) => Promise<CommentsInquiryOutputDto>;
}
