import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { UsersServiceInterface } from './interfaces/users.service.interface';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  UsersRegisterInputDto,
  UsersRegisterOutputDto,
} from './dtos/users.register.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('SERVICE') private readonly service: UsersServiceInterface,
  ) {}

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'USER REGISTER API', description: '회원 가입 절차' })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: UsersRegisterInputDto,
  ): Promise<UsersRegisterOutputDto> {
    if (!dto?.nickname) throw new BadRequestException();
    if (!dto?.email) throw new BadRequestException();
    if (!dto?.password) throw new BadRequestException();
    if (!dto?.phone) throw new BadRequestException();

    return await this.service.register(dto);
  }
}
