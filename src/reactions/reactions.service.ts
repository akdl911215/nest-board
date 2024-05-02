import { Inject, Injectable } from '@nestjs/common';
import { ReactionsServiceInterface } from './interfaces/reactions.service.interface';
import { ReactionsRepositoryInterface } from './interfaces/reactions.repository.interface';

import {
  ReactionsRegisterInputDto,
  ReactionsRegisterOutputDto,
} from './dtos/reactions.register.dto';
import { Reactions } from '@prisma/client';

@Injectable()
export class ReactionsService implements ReactionsServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: ReactionsRepositoryInterface,
  ) {}

  public async reaction(
    dto: ReactionsRegisterInputDto,
  ): Promise<ReactionsRegisterOutputDto> {
    const reaction: Reactions =
      await this.repository.reactionFindByUserIdAndBoardId({
        user_id: dto.userId,
        board_id: dto.boardId,
      });

    if (reaction) {
      const { reactionDelete } = await this.repository.delete({
        id: reaction.id,
        board_id: reaction.board_id,
      });
      if (dto.type !== reaction.type) {
        if (reactionDelete) {
          return await this.repository.update({
            id: reaction.id,
            type: dto.type,
            user_id: dto.userId,
            board_id: dto.boardId,
          });
        }
      }

      return null;
    } else {
      return await this.repository.register({
        user_id: dto.userId,
        board_id: dto.boardId,
        type: dto.type,
      });
    }
  }
}
