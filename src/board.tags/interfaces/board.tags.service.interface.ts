import {
  BoardTagsDeleteInputDto,
  BoardTagsDeleteOutputDto,
} from '../dtos/board.tags.delete.dto';
import {
  BoardTagsInquiryInputDto,
  BoardTagsInquiryOutputDto,
} from '../dtos/board.tags.inquiry.dto';
import {
  BoardTagsRegisterInputDto,
  BoardTagsRegisterOutputDto,
} from '../dtos/board.tags.register.dto';

export interface BoardTagsServiceInterface {
  readonly delete: (
    dto: BoardTagsDeleteInputDto,
  ) => Promise<BoardTagsDeleteOutputDto>;

  readonly inquiry: (
    dto: BoardTagsInquiryInputDto,
  ) => Promise<BoardTagsInquiryOutputDto>;

  readonly register: (
    dto: BoardTagsRegisterInputDto,
  ) => Promise<BoardTagsRegisterOutputDto>;
}
