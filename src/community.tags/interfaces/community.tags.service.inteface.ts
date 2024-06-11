import {
  CommunityTagsDeleteInputDto,
  CommunityTagsDeleteOutputDto,
} from '../dtos/community.tags.delete.dto';
import {
  CommunityTagsInquiryInputDto,
  CommunityTagsInquiryOutputDto,
} from '../dtos/community.tags.inquiry.dto';
import {
  CommunityTagsRegisterInputDto,
  CommunityTagsRegisterOutputDto,
} from '../dtos/community.tags.register.dto';

export interface CommunityTagsServiceInterface {
  readonly delete: (
    dto: CommunityTagsDeleteInputDto,
  ) => Promise<CommunityTagsDeleteOutputDto>;

  readonly inquiry: (
    dto: CommunityTagsInquiryInputDto,
  ) => Promise<CommunityTagsInquiryOutputDto>;

  readonly register: (
    dto: CommunityTagsRegisterInputDto,
  ) => Promise<CommunityTagsRegisterOutputDto>;
}
