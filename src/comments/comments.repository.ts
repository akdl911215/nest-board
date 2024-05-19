import { Dependencies, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { CommentsRepositoryInterface } from './interfaces/comments.repository.interface';
import { Comments } from '@prisma/client';
import { NOTFOUND_COMMENT } from '../_common/constant/errors/404';
import { errorHandling } from '../_common/abstract/error.handling';

@Injectable()
@Dependencies([PrismaService])
export class CommentsRepository implements CommentsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async delete(entity: {
    readonly id: Comments['id'];
    readonly board_id: Comments['board_id'];
  }): Promise<Comments> {
    const { id, board_id } = entity;
    const commentFindByIdAndBoardId: Comments =
      await this.prisma.comments.findFirst({
        where: { AND: [{ id }, { board_id }] },
      });
    if (!commentFindByIdAndBoardId)
      throw new NotFoundException(NOTFOUND_COMMENT);

    try {
      const deleteComment: Comments = await this.prisma.comments.update({
        where: { id },
        data: { deleted_at: new Date() },
      });

      return deleteComment;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async register(entity: {
    readonly board_id: Comments['board_id'];
    readonly content: Comments['content'];
    readonly nickname: Comments['nickname'];
  }): Promise<Comments> {
    try {
      const registerComment: Comments = await this.prisma.comments.create({
        data: entity,
      });

      return registerComment;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async update(entity: {
    readonly id: Comments['id'];
    readonly board_id: Comments['board_id'];
    readonly content: Comments['content'];
  }): Promise<Comments> {
    const { id, board_id, content } = entity;

    const commentFindByIdAndAuthor_id: Comments =
      await this.prisma.comments.findFirst({
        where: { AND: [{ id }, { board_id }] },
      });
    if (!commentFindByIdAndAuthor_id)
      throw new NotFoundException(NOTFOUND_COMMENT);

    try {
      const commentUpdate: Comments = await this.prisma.comments.update({
        where: { id },
        data: {
          content,
          updated_at: new Date(),
        },
      });

      return commentUpdate;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async list(entity: {
    readonly board_id: Comments['board_id'];
  }): Promise<Comments[]> {
    const { board_id } = entity;

    const CommentsFindByBoardId: Comments[] =
      await this.prisma.comments.findMany({
        where: {
          board_id,
          deleted_at: null,
          replies: {
            every: {
              deleted_at: null,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
        include: {
          replies: {
            where: {
              deleted_at: null,
            },
            orderBy: { created_at: 'asc' },
          },
        },
      });

    return CommentsFindByBoardId;
  }
}
