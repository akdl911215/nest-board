import { Inject, Injectable } from '@nestjs/common';
import { CommunityTagsServiceInterface } from './interfaces/community.tags.service.inteface';
import { CommunityTagsRepositoryInterface } from './interfaces/community.tags.repository.interface';
import {
  CommunityTagsDeleteInputDto,
  CommunityTagsDeleteOutputDto,
} from './dtos/community.tags.delete.dto';
import {
  CommunityTagsInquiryInputDto,
  CommunityTagsInquiryOutputDto,
} from './dtos/community.tags.inquiry.dto';
import {
  CommunityTagsRegisterInputDto,
  CommunityTagsRegisterOutputDto,
} from './dtos/community.tags.register.dto';

@Injectable()
export class CommunityTagsService implements CommunityTagsServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: CommunityTagsRepositoryInterface,
  ) {}

  public async delete(
    dto: CommunityTagsDeleteInputDto,
  ): Promise<CommunityTagsDeleteOutputDto> {
    return await this.repository.delete({
      community_id: dto.communityId,
      tag_id: dto.tagId,
    });
  }

  public async inquiry(
    dto: CommunityTagsInquiryInputDto,
  ): Promise<CommunityTagsInquiryOutputDto> {
    return await this.repository.inquiry({
      community_id: dto.communityId,
      tag_id: dto.tagId,
    });
  }

  public async register(
    dto: CommunityTagsRegisterInputDto,
  ): Promise<CommunityTagsRegisterOutputDto> {
    return await this.repository.register({
      community_id: dto.communityId,
      tags: dto.tags,
    });
  }
}
