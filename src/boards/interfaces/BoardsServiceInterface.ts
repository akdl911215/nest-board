import {
  BoardsDeleteInputDto,
  BoardsDeleteOutputDto,
} from '../dtos/boards.delete.dto';
import {
  BoardsInquiryInputDto,
  BoardsInquiryOutputDto,
} from '../dtos/boards.inquiry.dto';
import { BoardsListInputDto } from '../dtos/boards.list.dto';
import {
  BoardsRegisterInputDto,
  BoardsRegisterOutputDto,
} from '../dtos/boards.register.dto';
import {
  BoardsUpdatedInputDto,
  BoardsUpdateOutputDto,
} from '../dtos/boards.updated.dto';

export interface BoardsServiceInterface {
  readonly delete: (
    dto: BoardsDeleteInputDto,
  ) => Promise<BoardsDeleteOutputDto>;

  readonly inquiry: (
    dto: BoardsInquiryInputDto,
  ) => Promise<BoardsInquiryOutputDto>;

  readonly list: (dto: BoardsListInputDto) => Promise<BoardsListInputDto>;

  readonly register: (
    dto: BoardsRegisterInputDto,
  ) => Promise<BoardsRegisterOutputDto>;

  readonly update: (
    dto: BoardsUpdatedInputDto,
  ) => Promise<BoardsUpdateOutputDto>;
}
