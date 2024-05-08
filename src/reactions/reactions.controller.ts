import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReactionsServiceInterface } from './interfaces/reactions.service.interface';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  ReactionsRegisterInputDto,
  ReactionsRegisterOutputDto,
} from './dtos/reactions.register.dto';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import { NOTFOUND_REACTION } from '../_common/constant/errors/404';
import { EXISTING_REACTION } from '../_common/constant/errors/409';
import {
  BOARD_ID_REQUIRED,
  TYPE_REQUIRED,
  USER_ID_REQUIRED,
} from '../_common/constant/errors/400';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import {
  ReactionsCountInputDto,
  ReactionsCountOutputDto,
} from './dtos/reactions.count.dto';

@ApiTags('/reactions')
@Controller('/reactions')
export class ReactionsController {
  constructor(
    @Inject('SERVICE') private readonly service: ReactionsServiceInterface,
  ) {}

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'REACTIONS COUNT API',
    description: '리액션 숫자',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async count(
    @Query() dto: ReactionsCountInputDto,
  ): Promise<ReactionsCountOutputDto> {
    return await this.service.count(dto);
  }

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'REACTIONS REGISTER AND DELETE API',
    description: '리액션 등록 및 삭제 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${TYPE_REQUIRED}, ${BOARD_ID_REQUIRED}, ${USER_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 404, description: `${NOTFOUND_REACTION}` })
  @ApiResponse({ status: 409, description: `${EXISTING_REACTION}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async reaction(
    @Body() dto: ReactionsRegisterInputDto,
  ): Promise<ReactionsRegisterOutputDto> {
    if (!dto.type) throw new BadRequestException(TYPE_REQUIRED);
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);
    if (!dto?.userId) throw new BadRequestException(USER_ID_REQUIRED);

    return await this.service.reaction(dto);
  }
}
