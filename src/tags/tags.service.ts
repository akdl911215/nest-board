import { Inject, Injectable } from '@nestjs/common';
import { TagsServiceInterface } from './interfaces/tags.service.interface';
import { TagsRepositoryInterface } from './interfaces/tags.repository.interface';
import { TagsListOutputDto } from './dtos/tags.list.dto';

@Injectable()
export class TagsService implements TagsServiceInterface {
  constructor(
    @Inject('REPOSITORY') private readonly repository: TagsRepositoryInterface,
  ) {}

  public async list(): Promise<TagsListOutputDto> {
    return await this.repository.list();
  }
}
