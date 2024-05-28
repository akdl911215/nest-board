import { Inject, Injectable } from '@nestjs/common';
import { CategoriesServiceInterface } from './interfaces/categories.service.interface';
import { CategoriesRepositoryInterface } from './interfaces/categories.repository.interface';
import {
  CategoriesListInputDto,
  CategoriesListOutputDto,
} from './dtos/categories.list.dto';
import {
  CategoriesRegisterInputDto,
  CategoriesRegisterOutputDto,
} from './dtos/categories.register.dto';

@Injectable()
export class CategoriesService implements CategoriesServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: CategoriesRepositoryInterface,
  ) {}

  public async list(
    dto: CategoriesListInputDto,
  ): Promise<CategoriesListOutputDto> {
    return await this.repository.list(dto);
  }

  public async register(
    dto: CategoriesRegisterInputDto,
  ): Promise<CategoriesRegisterOutputDto> {
    return await this.repository.register(dto);
  }
}
