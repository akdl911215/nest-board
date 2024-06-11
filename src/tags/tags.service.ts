import { Inject, Injectable } from '@nestjs/common';
import { TagsServiceInterface } from './interfaces/tags.service.interface';
import { TagsRepositoryInterface } from './interfaces/tags.repository.interface';
import { TagsListOutputDto } from './dtos/tags.list.dto';
import {
  TagsRegisterInputDto,
  TagsRegisterOutputDto,
} from './dtos/tags.register.dto';

@Injectable()
export class TagsService implements TagsServiceInterface {
  constructor(
    @Inject('REPOSITORY') private readonly repository: TagsRepositoryInterface,
  ) {}

  public async list(): Promise<TagsListOutputDto> {
    return await this.repository.list();
  }

  public async register(
    dto: TagsRegisterInputDto,
  ): Promise<TagsRegisterOutputDto> {
    return await this.repository.register(dto);
  }
}
