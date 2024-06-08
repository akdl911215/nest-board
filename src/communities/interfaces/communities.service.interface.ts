import {
  CommunitiesDeleteInputDto,
  CommunitiesDeleteOutputDto,
} from '../dtos/communities.delete.dto';
import {
  CommunitiesInquiryInputDto,
  CommunitiesInquiryOutputDto,
} from '../dtos/communities.inquiry.dto';
import {
  CommunitiesListInputDto,
  CommunitiesListOutputDto,
} from '../dtos/communities.list.dto';
import {
  CommunitiesRegisterInputDto,
  CommunitiesRegisterOutputDto,
} from '../dtos/communities.register.dto';
import {
  CommunitiesUpdateInputDto,
  CommunitiesUpdateOutputDto,
} from '../dtos/communities.update.dto';

export interface CommunitiesServiceInterface {
  readonly delete: (
    dto: CommunitiesDeleteInputDto,
  ) => Promise<CommunitiesDeleteOutputDto>;

  readonly inquiry: (
    dto: CommunitiesInquiryInputDto,
  ) => Promise<CommunitiesInquiryOutputDto>;

  readonly list: (
    dto: CommunitiesListInputDto,
  ) => Promise<CommunitiesListOutputDto>;

  readonly register: (
    dto: CommunitiesRegisterInputDto,
  ) => Promise<CommunitiesRegisterOutputDto>;

  readonly update: (
    dto: CommunitiesUpdateInputDto,
  ) => Promise<CommunitiesUpdateOutputDto>;
}
