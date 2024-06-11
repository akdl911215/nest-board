import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoardTagsServiceInterface } from './interfaces/board.tags.service.interface';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  BoardTagsDeleteInputDto,
  BoardTagsDeleteOutputDto,
} from './dtos/board.tags.delete.dto';
import {
  BOARD_ID_REQUIRED,
  TAG_ID_REQUIRED,
  TAGS_REQUIRED,
} from '../_common/constant/errors/400';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import {
  BoardTagsInquiryInputDto,
  BoardTagsInquiryOutputDto,
} from './dtos/board.tags.inquiry.dto';
import {
  BoardTagsRegisterInputDto,
  BoardTagsRegisterOutputDto,
} from './dtos/board.tags.register.dto';
import { NOTFOUND_BOARD_TAG } from '../_common/constant/errors/404';
import { JwtAccessGuard } from '../users/infrastructure/token/guards/jwt.access.guard';

@ApiTags('board/tags')
@Controller('board/tags')
export class BoardTagsController {
  constructor(
    @Inject('SERVICE') private readonly service: BoardTagsServiceInterface,
  ) {}

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Delete('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARD TAGS DELETE API',
    description: '게시판 태그 삭제 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${TAG_ID_REQUIRED}, ${BOARD_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 404, description: `${NOTFOUND_BOARD_TAG}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: BoardTagsDeleteInputDto,
  ): Promise<BoardTagsDeleteOutputDto> {
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);
    if (!dto?.tagId) throw new BadRequestException(TAG_ID_REQUIRED);

    return await this.service.delete(dto);
  }

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARD TAGS LIST INQUIRY API',
    description: '게시판 태그 리스트 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${BOARD_ID_REQUIRED}, ${TAG_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async inquiry(
    @Query() dto: BoardTagsInquiryInputDto,
  ): Promise<BoardTagsInquiryOutputDto> {
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);
    if (!dto?.tagId) throw new BadRequestException(TAG_ID_REQUIRED);
    return await this.service.inquiry(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARD TAGS LIST REGISTER API',
    description: '게시판 태그 리스트 등록 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${TAGS_REQUIRED}, ${BOARD_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: BoardTagsRegisterInputDto,
  ): Promise<BoardTagsRegisterOutputDto> {
    console.log('register dto : ', dto);
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);
    if (!dto?.tags.length || dto.tags.length < 1)
      throw new BadRequestException(TAGS_REQUIRED);
    return await this.service.register(dto);
  }
}
