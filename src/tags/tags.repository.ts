import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { TagsRepositoryInterface } from './interfaces/tags.repository.interface';
import { Tags } from '@prisma/client';
import { errorHandling } from '../_common/abstract/error.handling';

@Injectable()
@Dependencies([PrismaService])
export class TagsRepository implements TagsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async list(): Promise<Tags[]> {
    const TagsList: Tags[] = await this.prisma.tags.findMany();
    return TagsList;
  }

  public async register(entity: {
    readonly name: Tags['name'];
  }): Promise<Tags> {
    const { name } = entity;

    try {
      const registerTag: Tags = await this.prisma.$transaction(
        async () =>
          await this.prisma.tags.upsert({
            where: { name },
            update: {},
            create: { name },
          }),
      );

      return registerTag;
    } catch (e: any) {
      errorHandling(e);
    }

    return Promise.resolve(undefined);
  }
}
