import { Inject, Injectable } from '@nestjs/common';
import { BoardsServiceInterface } from './interfaces/boards.service.interface';
import {
  BoardsDeleteInputDto,
  BoardsDeleteOutputDto,
} from './dtos/boards.delete.dto';
import {
  BoardsInquiryInputDto,
  BoardsInquiryOutputDto,
} from './dtos/boards.inquiry.dto';
import {
  BoardsListInputDto,
  BoardsListOutputDto,
} from './dtos/boards.list.dto';
import {
  BoardsRegisterInputDto,
  BoardsRegisterOutputDto,
} from './dtos/boards.register.dto';
import {
  BoardsUpdateInputDto,
  BoardsUpdateOutputDto,
} from './dtos/boards.update.dto';
import { BoardsRepositoryInterface } from './interfaces/boards.repository.interface';
import {
  BoardsReadInputDto,
  BoardsReadOutputDto,
} from './dtos/boards.read.dto';

@Injectable()
export class BoardsService implements BoardsServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: BoardsRepositoryInterface,
  ) {}

  public async delete(
    dto: BoardsDeleteInputDto,
  ): Promise<BoardsDeleteOutputDto> {
    return await this.repository.delete(dto);
  }

  public async inquiry(
    dto: BoardsInquiryInputDto,
  ): Promise<BoardsInquiryOutputDto> {
    return await this.repository.inquiry(dto);
  }

  public async list(dto: BoardsListInputDto): Promise<BoardsListOutputDto> {
    return await this.repository.list({
      last_id: dto.lastId,
      take: dto.take,
      category: dto.category,
    });
  }

  public async register(
    dto: BoardsRegisterInputDto,
  ): Promise<BoardsRegisterOutputDto> {
    return await this.repository.register({
      category: dto.category,
      title: dto.title,
      nickname: dto.nickname,
      content: dto.content,
      identifier_id: dto.identifierId,
    });
  }

  public async update(
    dto: BoardsUpdateInputDto,
  ): Promise<BoardsUpdateOutputDto> {
    return await this.repository.update({
      id: dto.id,
      nickname: dto.nickname,
      title: dto.title,
      category: dto.category,
      content: dto.content,
    });
  }

  public async read(dto: BoardsReadInputDto): Promise<BoardsReadOutputDto> {
    return await this.repository.read(dto);
  }
}
