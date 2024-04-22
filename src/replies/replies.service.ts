import { Inject, Injectable } from '@nestjs/common';
import { RepliesServiceInterface } from './interfaces/replies.service.interface';
import { RepliesRepositoryInterface } from './interfaces/replies.repository.interface';
import {
  RepliesDeleteInputDto,
  RepliesDeleteOutputDto,
} from './dtos/replies.delete.dto';
import {
  RepliesRegisterInputDto,
  RepliesRegisterOutputDto,
} from './dtos/replies.register.dto';
import {
  RepliesUpdateInputDto,
  RepliesUpdateOutputDto,
} from './dtos/replies.update.dto';

@Injectable()
export class RepliesService implements RepliesServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: RepliesRepositoryInterface,
  ) {}

  public async delete(
    dto: RepliesDeleteInputDto,
  ): Promise<RepliesDeleteOutputDto> {
    return await this.repository.delete({
      id: dto.id,
      comment_id: dto.commentId,
    });
  }

  public async register(
    dto: RepliesRegisterInputDto,
  ): Promise<RepliesRegisterOutputDto> {
    return await this.repository.register({
      nickname: dto.nickname,
      content: dto.content,
      comment_id: dto.commentId,
    });
  }

  public async update(
    dto: RepliesUpdateInputDto,
  ): Promise<RepliesUpdateOutputDto> {
    return await this.repository.update({
      id: dto.id,
      nickname: dto.nickname,
      content: dto.content,
      comment_id: dto.commentId,
    });
  }
}
