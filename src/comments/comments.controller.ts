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
  USER_ID_REQUIRED,
} from '../_common/constant/errors/400';
import {
  CommentsUpdateInputDto,
  CommentsUpdateOutputDto,
} from './dtos/comments.update.dto';
import {
  CommentsListInputDto,
  CommentsListOutputDto,
} from './dtos/comments.list.dto';
import {
  CommentsInquiryInputDto,
  CommentsInquiryOutputDto,
} from './dtos/comments.inquiry.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    @Inject('SERVICE') private readonly service: CommentsServiceInterface,
  ) {}

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMENTS LIST INQUIRY API',
    description: '댓글 리스트 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${BOARD_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async list(
    @Query() dto: CommentsListInputDto,
  ): Promise<CommentsListOutputDto> {
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);

    return await this.service.list(dto);
  }

  @Get('/:userId')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'RETRIEVE COMMENT LIST BASED ON USER UNIQUE KEY API',
    description: '유저 유니크키 기준으로 댓글 리스트 조회',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${USER_ID_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async inquiry(
    @Param() dto: CommentsInquiryInputDto,
  ): Promise<CommentsInquiryOutputDto> {
    if (!dto?.userId) throw new BadRequestException(USER_ID_REQUIRED);

    return await this.service.inquiry(dto);
  }

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMENTS REGISTER API',
    description: '댓글 등록 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${BOARD_ID_REQUIRED}, ${NICKNAME_REQUIRED}, ${USER_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: CommentsRegisterInputDto,
  ): Promise<CommentsRegisterOutputDto> {
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);
    if (!dto?.userId) throw new BadRequestException(USER_ID_REQUIRED);

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
