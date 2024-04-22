import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RepliesServiceInterface } from './interfaces/replies.service.interface';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  RepliesRegisterInputDto,
  RepliesRegisterOutputDto,
} from './dtos/replies.register.dto';
import {
  COMMENT_ID_REQUIRED,
  NICKNAME_REQUIRED,
  UNIQUE_ID_REQUIRED,
} from '../_common/constant/errors/400';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { NOTFOUND_REPLY } from '../_common/constant/errors/404';
import {
  RepliesDeleteInputDto,
  RepliesDeleteOutputDto,
} from './dtos/replies.delete.dto';
import {
  RepliesUpdateInputDto,
  RepliesUpdateOutputDto,
} from './dtos/replies.update.dto';

@ApiTags('replies')
@Controller('replies')
export class RepliesController {
  constructor(
    @Inject('SERVICE') private readonly service: RepliesServiceInterface,
  ) {}

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'REPLIES REGISTER API',
    description: '대댓글 등록 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${COMMENT_ID_REQUIRED}, ${NICKNAME_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: RepliesRegisterInputDto,
  ): Promise<RepliesRegisterOutputDto> {
    if (!dto?.commentId) throw new BadRequestException(COMMENT_ID_REQUIRED);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);

    return await this.service.register(dto);
  }

  @Patch('/delete')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'REPLIES DELETE API',
    description: '대댓글 삭제 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${UNIQUE_ID_REQUIRED}, ${COMMENT_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 404, description: `${NOTFOUND_REPLY}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: RepliesDeleteInputDto,
  ): Promise<RepliesDeleteOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.commentId) throw new BadRequestException(COMMENT_ID_REQUIRED);

    return await this.service.delete(dto);
  }

  @Patch('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'REPLIES UPDATE API',
    description: '대댓글 업데이트 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `` })
  @ApiResponse({ status: 404, description: `${NOTFOUND_REPLY}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async update(
    @Body() dto: RepliesUpdateInputDto,
  ): Promise<RepliesUpdateOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);
    if (!dto?.commentId) throw new BadRequestException(COMMENT_ID_REQUIRED);

    return await this.service.update(dto);
  }
}
