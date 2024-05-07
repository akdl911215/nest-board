import { Inject, Injectable } from '@nestjs/common';
import { UsersServiceInterface } from './interfaces/users.service.interface';
import { UsersRepositoryInterface } from './interfaces/users.repository.interface';
import {
  UsersDeleteInputDto,
  UsersDeleteOutputDto,
} from './dtos/users.delete.dto';
import {
  UsersInquiryInputDto,
  UsersInquiryOutputDto,
} from './dtos/users.inquiry.dto';
import { UsersListInputDto, UsersListOutputDto } from './dtos/users.list.dto';
import {
  UsersLoginInputDto,
  UsersLoginOutputDto,
} from './dtos/users.login.dto';
import {
  UsersRegisterInputDto,
  UsersRegisterOutputDto,
} from './dtos/users.register.dto';
import {
  UsersUpdateInputDto,
  UsersUpdateOutputDto,
} from './dtos/users.update.dto';
import {
  UsersProfileInputDto,
  UsersProfileOutputDto,
} from './dtos/users.profile.dto';
import {
  UsersRefreshTokenReIssuanceInputDto,
  UsersRefreshTokenReIssuanceOutputDto,
} from './dtos/users.refresh.token.re.issuance.dto';
import {
  UsersExistingEmailInputDto,
  UsersExistingEmailOutputDto,
} from './dtos/users.existing.email.dto';
import {
  UsersExistingNicknameInputDto,
  UsersExistingNicknameOutputDto,
} from './dtos/users.existing.nickname.dto';
import {
  UsersExistingPhoneInputDto,
  UsersExistingPhoneOutputDto,
} from './dtos/users.existing.phone.dto';
import {
  UsersLogoutInputDto,
  UsersLogoutOutputDto,
} from './dtos/users.logout.dto';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @Inject('REPOSITORY') private readonly repository: UsersRepositoryInterface,
  ) {}

  public async delete(dto: UsersDeleteInputDto): Promise<UsersDeleteOutputDto> {
    return await this.repository.delete(dto);
  }

  public async inquiry(
    dto: UsersInquiryInputDto,
  ): Promise<UsersInquiryOutputDto> {
    return await this.repository.inquiry({
      ...dto,
      last_id: dto.lastId,
    });
  }

  public async list(dto: UsersListInputDto): Promise<UsersListOutputDto> {
    return await this.repository.list(dto);
  }

  public async login(dto: UsersLoginInputDto): Promise<UsersLoginOutputDto> {
    return await this.repository.login(dto);
  }

  public async register(
    dto: UsersRegisterInputDto,
  ): Promise<UsersRegisterOutputDto> {
    return await this.repository.register(dto);
  }

  public async update(dto: UsersUpdateInputDto): Promise<UsersUpdateOutputDto> {
    return await this.repository.update(dto);
  }

  public async profile(
    dto: UsersProfileInputDto,
  ): Promise<UsersProfileOutputDto> {
    return await this.repository.profile(dto);
  }

  public async refresh(
    dto: UsersRefreshTokenReIssuanceInputDto,
  ): Promise<UsersRefreshTokenReIssuanceOutputDto> {
    return await this.repository.refresh(dto);
  }

  public async existingEmail(
    dto: UsersExistingEmailInputDto,
  ): Promise<UsersExistingEmailOutputDto> {
    return await this.repository.existingEmail(dto);
  }

  public async existingNickname(
    dto: UsersExistingNicknameInputDto,
  ): Promise<UsersExistingNicknameOutputDto> {
    return await this.repository.existingNickname(dto);
  }

  public async existingPhone(
    dto: UsersExistingPhoneInputDto,
  ): Promise<UsersExistingPhoneOutputDto> {
    return await this.repository.existingPhone(dto);
  }

  public async logout(dto: UsersLogoutInputDto): Promise<UsersLogoutOutputDto> {
    return await this.repository.logout({
      refresh_token: dto.refreshToken,
    });
  }
}
