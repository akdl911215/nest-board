import { Inject, Injectable } from '@nestjs/common';
import { CommunitiesServiceInterface } from './interfaces/communities.service.interface';
import { CommunitiesRepositoryInterface } from './interfaces/communities.repository.interface';
import {
  CommunitiesDeleteInputDto,
  CommunitiesDeleteOutputDto,
} from './dtos/communities.delete.dto';
import {
  CommunitiesInquiryInputDto,
  CommunitiesInquiryOutputDto,
} from './dtos/communities.inquiry.dto';
import {
  CommunitiesListInputDto,
  CommunitiesListOutputDto,
} from './dtos/communities.list.dto';
import {
  CommunitiesRegisterInputDto,
  CommunitiesRegisterOutputDto,
} from './dtos/communities.register.dto';
import {
  CommunitiesUpdateInputDto,
  CommunitiesUpdateOutputDto,
} from './dtos/communities.update.dto';
import {
  CommunitiesGetCommunitiesNameInputDto,
  CommunitiesGetCommunitiesNameOutputDto,
} from './dtos/communities.get.communities.name.dto';

@Injectable()
export class CommunitiesService implements CommunitiesServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: CommunitiesRepositoryInterface,
  ) {}

  public async delete(
    dto: CommunitiesDeleteInputDto,
  ): Promise<CommunitiesDeleteOutputDto> {
    return await this.repository.delete(dto);
  }

  public async inquiry(
    dto: CommunitiesInquiryInputDto,
  ): Promise<CommunitiesInquiryOutputDto> {
    return await this.repository.inquiry(dto);
  }

  public async list(
    dto: CommunitiesListInputDto,
  ): Promise<CommunitiesListOutputDto> {
    return await this.repository.list(dto);
  }

  public async register(
    dto: CommunitiesRegisterInputDto,
  ): Promise<CommunitiesRegisterOutputDto> {
    return await this.repository.register({
      ...dto,
      banner: dto.banner,
      icon: dto.icon,
    });
  }

  public async update(
    dto: CommunitiesUpdateInputDto,
  ): Promise<CommunitiesUpdateOutputDto> {
    return await this.repository.update({
      ...dto,
      banner: dto.banner,
      icon: dto.icon,
    });
  }

  public async getCommunitiesName(
    dto: CommunitiesGetCommunitiesNameInputDto,
  ): Promise<CommunitiesGetCommunitiesNameOutputDto> {
    return await this.repository.getCommunitiesName(dto);
  }
}
