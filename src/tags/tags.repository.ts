import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { TagsRepositoryInterface } from './interfaces/tags.repository.interface';
import { Tags } from '@prisma/client';

@Injectable()
@Dependencies([PrismaService])
export class TagsRepository implements TagsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async list(): Promise<Tags[]> {
    const TagsList: Tags[] = await this.prisma.tags.findMany();
    return TagsList;
  }
}
