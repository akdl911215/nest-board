import {
  BoardsDeleteInputDto,
  BoardsDeleteOutputDto,
} from '../dtos/boards.delete.dto';
import {
  BoardsInquiryInputDto,
  BoardsInquiryOutputDto,
} from '../dtos/boards.inquiry.dto';
import {
  BoardsListInputDto,
  BoardsListOutputDto,
} from '../dtos/boards.list.dto';
import {
  BoardsRegisterInputDto,
  BoardsRegisterOutputDto,
} from '../dtos/boards.register.dto';
import {
  BoardsUpdateInputDto,
  BoardsUpdateOutputDto,
} from '../dtos/boards.update.dto';
import {
  BoardsReadInputDto,
  BoardsReadOutputDto,
} from '../dtos/boards.read.dto';
import {
  BoardsAllListInputDto,
  BoardsAllListOutputDto,
} from '../dtos/boards.all.list.dto';
import {
  BoardsPopularListInputDto,
  BoardsPopularListOutputDto,
} from '../dtos/boards.popular.list.dto';

export interface BoardsServiceInterface {
  readonly delete: (
    dto: BoardsDeleteInputDto,
  ) => Promise<BoardsDeleteOutputDto>;

  readonly inquiry: (
    dto: BoardsInquiryInputDto,
  ) => Promise<BoardsInquiryOutputDto>;

  readonly list: (dto: BoardsListInputDto) => Promise<BoardsListOutputDto>;

  readonly allList: (
    dto: BoardsAllListInputDto,
  ) => Promise<BoardsAllListOutputDto>;

  readonly popularList: (
    dto: BoardsPopularListInputDto,
  ) => Promise<BoardsPopularListOutputDto>;

  readonly register: (
    dto: BoardsRegisterInputDto,
  ) => Promise<BoardsRegisterOutputDto>;

  readonly update: (
    dto: BoardsUpdateInputDto,
  ) => Promise<BoardsUpdateOutputDto>;

  readonly read: (dto: BoardsReadInputDto) => Promise<BoardsReadOutputDto>;
}
