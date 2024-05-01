import { Inject, Injectable } from '@nestjs/common';
import { ReactionsServiceInterface } from './interfaces/reactions.service.interface';
import { ReactionsRepositoryInterface } from './interfaces/reactions.repository.interface';
import {
  ReactionsDeleteOutputDto,
  ReactionsDeleteInputDto,
} from './dtos/reactions.delete.dto';
import {
  ReactionsUpdateInputDto,
  ReactionsUpdateOutputDto,
} from './dtos/reactions.update.dto';

@Injectable()
export class ReactionsService implements ReactionsServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: ReactionsRepositoryInterface,
  ) {}

  public async delete(
    dto: ReactionsDeleteInputDto,
  ): Promise<ReactionsDeleteOutputDto> {
    return await this.repository.delete({
      id: dto.id,
      board_id: dto.boardId,
    });
  }

  public async update(
    dto: ReactionsUpdateInputDto,
  ): Promise<ReactionsUpdateOutputDto> {
    return await this.repository.update({
      id: dto.id,
      type: dto.type,
      board_id: dto.boardId,
    });
  }
}
