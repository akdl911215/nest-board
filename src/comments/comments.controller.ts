import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsServiceInterface } from './interfaces/comments.service.interface';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  CommentsRegisterInputDto,
  CommentsRegisterOutputDto,
} from './dtos/comments.register.dto';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { NOTFOUND_COMMENT } from '../_common/constant/errors/404';
import {
  CommentsDeleteInputDto,
  CommentsDeleteOutputDto,
} from './dtos/comments.delete.dto';
import {
  BOARD_ID_REQUIRED,
  NICKNAME_REQUIRED,
  UNIQUE_ID_REQUIRED,
} from '../_common/constant/errors/400';
import {
  CommentsUpdateInputDto,
  CommentsUpdateOutputDto,
} from './dtos/comments.update.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    @Inject('SERVICE') private readonly service: CommentsServiceInterface,
  ) {}

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMENTS REGISTER API',
    description: '댓글 등록 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${BOARD_ID_REQUIRED}, ${NICKNAME_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: CommentsRegisterInputDto,
  ): Promise<CommentsRegisterOutputDto> {
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);

    return await this.service.register(dto);
  }

  @Patch('/delete')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMENTS DELETE API',
    description: '댓글 삭제 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${UNIQUE_ID_REQUIRED}, ${BOARD_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 404, description: `${NOTFOUND_COMMENT}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: CommentsDeleteInputDto,
  ): Promise<CommentsDeleteOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);

    return await this.service.delete(dto);
  }

  @Patch('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMENTS UPDATE API',
    description: '댓글 업데이트 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${UNIQUE_ID_REQUIRED}, ${BOARD_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 404, description: `${NOTFOUND_COMMENT}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async update(
    @Body() dto: CommentsUpdateInputDto,
  ): Promise<CommentsUpdateOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);

    return await this.service.update(dto);
  }
}
