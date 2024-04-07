import { Inject, Injectable } from '@nestjs/common';
import { UsersServiceInterface } from './interfaces/users.service.interface';
import { UsersRepositoryInterface } from './interfaces/users.repository.interface';
import {
  UsersDeleteInputDto,
  UsersDeleteOutput,
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

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @Inject('REPOSITORY') private readonly repository: UsersRepositoryInterface,
  ) {}

  public async delete(dto: UsersDeleteInputDto): Promise<UsersDeleteOutput> {
    return await this.repository.delete(dto);
  }

  public async inquiry(
    dto: UsersInquiryInputDto,
  ): Promise<UsersInquiryOutputDto> {
    return await this.repository.inquiry(dto);
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
}
