import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersServiceInterface } from './interfaces/users.service.interface';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CREATE_SUCCESS,
  LOGIN_SUCCESS,
} from '../_common/constant/successes/201';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  UsersRegisterInputDto,
  UsersRegisterOutputDto,
} from './dtos/users.register.dto';
import {
  EMAIL_REQUIRED,
  NICKNAME_REQUIRED,
  PASSWORD_REQUIRED,
  PHONE_REQUIRED,
  UNIQUE_ID_REQUIRED,
} from '../_common/constant/errors/400';
import {
  UsersLoginInputDto,
  UsersLoginOutputDto,
} from './dtos/users.login.dto';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import {
  UsersInquiryInputDto,
  UsersInquiryOutputDto,
} from './dtos/users.inquiry.dto';
import {
  UsersDeleteInputDto,
  UsersDeleteOutputDto,
} from './dtos/users.delete.dto';
import {
  UsersUpdateInputDto,
  UsersUpdateOutputDto,
} from './dtos/users.update.dto';
import {
  UsersProfileInputDto,
  UsersProfileOutputDto,
} from './dtos/users.profile.dto';
import { PasswordCheckingInterceptor } from './infrastructure/interceptor/password.checking.interceptor';
import { RegisterRefreshTokenDeleteInterceptor } from './infrastructure/interceptor/register.refresh.token.delete.interceptor';

@ApiTags('users')
@Controller('users')
@UseInterceptors(PasswordCheckingInterceptor)
@UseInterceptors(RegisterRefreshTokenDeleteInterceptor)
export class UsersController {
  constructor(
    @Inject('SERVICE') private readonly service: UsersServiceInterface,
  ) {}

  @Get('/profile/:id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER PROFILE API',
    description: '유저 프로필 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${UNIQUE_ID_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async profile(
    @Param() dto: UsersProfileInputDto,
  ): Promise<UsersProfileOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);

    return await this.service.profile(dto);
  }

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'USER REGISTER API', description: '회원 가입 절차' })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${NICKNAME_REQUIRED}, ${EMAIL_REQUIRED}, ${PASSWORD_REQUIRED}, ${PHONE_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: UsersRegisterInputDto,
  ): Promise<UsersRegisterOutputDto> {
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);
    if (!dto?.email) throw new BadRequestException(EMAIL_REQUIRED);
    if (!dto?.password) throw new BadRequestException(PASSWORD_REQUIRED);
    if (!dto?.phone) throw new BadRequestException(PHONE_REQUIRED);

    return await this.service.register(dto);
  }

  @Post('/login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'USER LOGIN API', description: '로그인 절차' })
  @ApiResponse({ status: 201, description: `${LOGIN_SUCCESS}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async login(
    @Body() dto: UsersLoginInputDto,
  ): Promise<UsersLoginOutputDto> {
    if (!dto?.email) throw new BadRequestException(EMAIL_REQUIRED);
    if (!dto?.password) throw new BadRequestException(PASSWORD_REQUIRED);

    return await this.service.login(dto);
  }

  @Get('/inquiry')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER INQUIRY API',
    description: '유저 관련 정보 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${NICKNAME_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async inquiry(
    @Query() dto: UsersInquiryInputDto,
  ): Promise<UsersInquiryOutputDto> {
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);

    return await this.service.inquiry(dto);
  }

  @Patch('/delete')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER DELETE API',
    description: '유저 삭제 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${UNIQUE_ID_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: UsersDeleteInputDto,
  ): Promise<UsersDeleteOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);

    return await this.service.delete(dto);
  }

  @Patch('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER UPDATE API',
    description: '유저 수정 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${UNIQUE_ID_REQUIRED}, ${NICKNAME_REQUIRED}, ${EMAIL_REQUIRED}, ${PHONE_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async update(
    @Body() dto: UsersUpdateInputDto,
  ): Promise<UsersUpdateOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);
    if (!dto?.email) throw new BadRequestException(EMAIL_REQUIRED);
    if (!dto?.phone) throw new BadRequestException(PHONE_REQUIRED);

    return await this.service.update(dto);
  }
}
