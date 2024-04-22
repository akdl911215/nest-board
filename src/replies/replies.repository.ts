import { Dependencies, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { RepliesRepositoryInterface } from './interfaces/replies.repository.interface';
import { Replies } from '@prisma/client';
import { NOTFOUND_REPLY } from '../_common/constant/errors/404';
import { errorHandling } from '../_common/abstract/error.handling';

@Injectable()
@Dependencies([PrismaService])
export class RepliesRepository implements RepliesRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async delete(entity: {
    readonly id: Replies['id'];
    readonly comment_id: Replies['comment_id'];
  }): Promise<Replies> {
    const { id, comment_id } = entity;

    const replyFindByIdAndNickname = await this.prisma.replies.findFirst({
      where: { AND: [{ id }, { comment_id }] },
    });
    if (!replyFindByIdAndNickname) throw new NotFoundException(NOTFOUND_REPLY);

    try {
      const deleteReply: Replies = await this.prisma.replies.update({
        where: { id },
        data: { deleted_at: new Date() },
      });

      return deleteReply;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async register(entity: {
    readonly nickname: Replies['nickname'];
    readonly content: Replies['content'];
    readonly comment_id: Replies['comment_id'];
  }): Promise<Replies> {
    try {
      const registerReply: Replies = await this.prisma.replies.create({
        data: entity,
      });

      return registerReply;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async update(entity: {
    readonly id: Replies['id'];
    readonly nickname: Replies['nickname'];
    readonly content: Replies['content'];
    readonly comment_id: Replies['comment_id'];
  }): Promise<Replies> {
    const { id, nickname, content, comment_id } = entity;

    const replyFindByIdAndCommentId: Replies =
      await this.prisma.replies.findFirst({
        where: { AND: [{ id }, { comment_id }] },
      });
    if (!replyFindByIdAndCommentId) throw new NotFoundException(NOTFOUND_REPLY);

    try {
      const replyFindByIdAndCommentId: Replies =
        await this.prisma.replies.update({
          where: { id },
          data: {
            id,
            nickname,
            comment_id,
            content,
            updated_at: new Date(),
          },
        });

      return replyFindByIdAndCommentId;
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
