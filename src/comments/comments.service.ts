import { Inject, Injectable } from '@nestjs/common';
import { CommentsServiceInterface } from './interfaces/comments.service.interface';
import { CommentsRepositoryInterface } from './interfaces/comments.repository.interface';
import {
  CommentsDeleteInputDto,
  CommentsDeleteOutputDto,
} from './dtos/comments.delete.dto';
import {
  CommentsRegisterInputDto,
  CommentsRegisterOutputDto,
} from './dtos/comments.register.dto';
import {
  CommentsUpdateInputDto,
  CommentsUpdateOutputDto,
} from './dtos/comments.update.dto';
import {
  CommentsListInputDto,
  CommentsListOutputDto,
} from './dtos/comments.list.dto';

@Injectable()
export class CommentsService implements CommentsServiceInterface {
  constructor(
    @Inject('REPOSITORY') private readonly service: CommentsRepositoryInterface,
  ) {}

  public async delete(
    dto: CommentsDeleteInputDto,
  ): Promise<CommentsDeleteOutputDto> {
    return await this.service.delete({
      id: dto.id,
      board_id: dto.boardId,
    });
  }

  public async register(
    dto: CommentsRegisterInputDto,
  ): Promise<CommentsRegisterOutputDto> {
    return await this.service.register({
      board_id: dto.boardId,
      nickname: dto.nickname,
      content: dto.content,
    });
  }

  public async update(
    dto: CommentsUpdateInputDto,
  ): Promise<CommentsUpdateOutputDto> {
    return await this.service.update({
      id: dto.id,
      board_id: dto.boardId,
      content: dto.content,
    });
  }

  public async list(dto: CommentsListInputDto): Promise<CommentsListOutputDto> {
    return await this.service.list({ board_id: dto.boardId });
  }
}
