import { Inject, Injectable } from '@nestjs/common';
import { BoardTagsServiceInterface } from './interfaces/board.tags.service.interface';
import { BoardTagsRepositoryInterface } from './interfaces/board.tags.repository.interface';
import {
  BoardTagsDeleteInputDto,
  BoardTagsDeleteOutputDto,
} from './dtos/board.tags.delete.dto';
import {
  BoardTagsInquiryInputDto,
  BoardTagsInquiryOutputDto,
} from './dtos/board.tags.inquiry.dto';
import {
  BoardTagsRegisterInputDto,
  BoardTagsRegisterOutputDto,
} from './dtos/board.tags.register.dto';

@Injectable()
export class BoardTagsService implements BoardTagsServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: BoardTagsRepositoryInterface,
  ) {}

  public async delete(
    dto: BoardTagsDeleteInputDto,
  ): Promise<BoardTagsDeleteOutputDto> {
    return await this.repository.delete({
      board_id: dto.boardId,
      tag_id: dto.tagId,
    });
  }

  public async inquiry(
    dto: BoardTagsInquiryInputDto,
  ): Promise<BoardTagsInquiryOutputDto> {
    return await this.repository.inquiry({
      board_id: dto.boardId,
      tag_id: dto.tagId,
    });
  }

  public async register(
    dto: BoardTagsRegisterInputDto,
  ): Promise<BoardTagsRegisterOutputDto> {
    return await this.repository.register({
      board_id: dto.boardId,
      tags: dto.tags,
    });
  }
}
