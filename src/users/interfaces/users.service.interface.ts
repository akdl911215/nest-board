import {
  UsersInquiryInputDto,
  UsersInquiryOutputDto,
} from '../dtos/users.inquiry.dto';
import { UsersListInputDto, UsersListOutputDto } from '../dtos/users.list.dto';
import {
  UsersRegisterInputDto,
  UsersRegisterOutputDto,
} from '../dtos/users.register.dto';
import {
  UsersUpdateInputDto,
  UsersUpdateOutputDto,
} from '../dtos/users.update.dto';
import {
  UsersDeleteInputDto,
  UsersDeleteOutputDto,
} from '../dtos/users.delete.dto';
import {
  UsersLoginInputDto,
  UsersLoginOutputDto,
} from '../dtos/users.login.dto';
import {
  UsersProfileInputDto,
  UsersProfileOutputDto,
} from '../dtos/users.profile.dto';
import {
  UsersRefreshTokenReIssuanceInputDto,
  UsersRefreshTokenReIssuanceOutputDto,
} from '../dtos/users.refresh.token.re.issuance.dto';
import {
  UsersExistingEmailInputDto,
  UsersExistingEmailOutputDto,
} from '../dtos/users.existing.email.dto';
import {
  UsersExistingNicknameInputDto,
  UsersExistingNicknameOutputDto,
} from '../dtos/users.existing.nickname.dto';
import {
  UsersExistingPhoneInputDto,
  UsersExistingPhoneOutputDto,
} from '../dtos/users.existing.phone.dto';

export interface UsersServiceInterface {
  readonly delete: (dto: UsersDeleteInputDto) => Promise<UsersDeleteOutputDto>;

  readonly inquiry: (
    dto: UsersInquiryInputDto,
  ) => Promise<UsersInquiryOutputDto>;

  readonly list: (dto: UsersListInputDto) => Promise<UsersListOutputDto>;

  readonly login: (dto: UsersLoginInputDto) => Promise<UsersLoginOutputDto>;

  readonly register: (
    dto: UsersRegisterInputDto,
  ) => Promise<UsersRegisterOutputDto>;

  readonly update: (dto: UsersUpdateInputDto) => Promise<UsersUpdateOutputDto>;

  readonly profile: (
    dto: UsersProfileInputDto,
  ) => Promise<UsersProfileOutputDto>;

  readonly refresh: (
    dto: UsersRefreshTokenReIssuanceInputDto,
  ) => Promise<UsersRefreshTokenReIssuanceOutputDto>;

  readonly existingEmail: (
    dto: UsersExistingEmailInputDto,
  ) => Promise<UsersExistingEmailOutputDto>;

  readonly existingNickname: (
    dto: UsersExistingNicknameInputDto,
  ) => Promise<UsersExistingNicknameOutputDto>;

  readonly existingPhone: (
    dto: UsersExistingPhoneInputDto,
  ) => Promise<UsersExistingPhoneOutputDto>;
}
