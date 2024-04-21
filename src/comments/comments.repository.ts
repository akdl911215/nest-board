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
  }): Promise<Comments> {
    const commentFindById: Comments = await this.prisma.comments.findUnique({
      where: { id: entity.id },
    });
    if (!commentFindById) throw new NotFoundException(NOTFOUND_COMMENT);

    return commentFindById;
  }

  public async register(entity: {
    readonly author_id: Comments['author_id'];
    readonly content: Comments['content'];
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
    readonly author_id: Comments['author_id'];
    readonly content: Comments['content'];
  }): Promise<Comments> {
    const { id, author_id, content } = entity;

    const commentFindByIdAndAuthor_id: Comments =
      await this.prisma.comments.findFirst({
        where: { AND: [{ id }, { author_id }] },
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
}
