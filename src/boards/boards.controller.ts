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
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoardsServiceInterface } from './interfaces/boards.service.interface';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  BoardsListInputDto,
  BoardsListOutputDto,
} from './dtos/boards.list.dto';
import {
  CATEGORY_REQUIRED,
  NICKNAME_REQUIRED,
  TAKE_REQUIRED,
  TITLE_REQUIRED,
  UNIQUE_ID_REQUIRED,
} from '../_common/constant/errors/400';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import {
  BoardsRegisterInputDto,
  BoardsRegisterOutputDto,
} from './dtos/boards.register.dto';
import {
  BoardsDeleteInputDto,
  BoardsDeleteOutputDto,
} from './dtos/boards.delete.dto';
import {
  BoardsInquiryInputDto,
  BoardsInquiryOutputDto,
} from './dtos/boards.inquiry.dto';
import {
  BoardsUpdateInputDto,
  BoardsUpdateOutputDto,
} from './dtos/boards.update.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    @Inject('SERVICE') private readonly service: BoardsServiceInterface,
  ) {}

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARDS LIST API',
    description: '게시판 리스트 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${TAKE_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async list(
    @Query() dto: BoardsListInputDto,
  ): Promise<BoardsListOutputDto> {
    if (!dto?.take || dto.take < 0)
      throw new BadRequestException(TAKE_REQUIRED);

    return await this.service.list(dto);
  }

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARDS REGISTER API',
    description: '게시판 등록 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: BoardsRegisterInputDto,
  ): Promise<BoardsRegisterOutputDto> {
    return await this.service.register(dto);
  }
  @Patch('/delete')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARD DELETE API',
    description: '게시판 삭제 절차',
  })
  @ApiResponse({
    status: 200,
    description: `${TWO_HUNDRED_OK}`,
  })
  @ApiResponse({ status: 400, description: `` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: BoardsDeleteInputDto,
  ): Promise<BoardsDeleteOutputDto> {
    return await this.service.delete(dto);
  }

  @Get('/:id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARD INQUIRY API',
    description: '게시판 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${UNIQUE_ID_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async inquiry(
    @Param() dto: BoardsInquiryInputDto,
  ): Promise<BoardsInquiryOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);

    return await this.service.inquiry(dto);
  }

  @Patch('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARD MODIFY API',
    description: '게시판 수정 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${UNIQUE_ID_REQUIRED}, ${CATEGORY_REQUIRED}, ${TITLE_REQUIRED}, ${NICKNAME_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async update(
    @Body() dto: BoardsUpdateInputDto,
  ): Promise<BoardsUpdateOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.category) throw new BadRequestException(CATEGORY_REQUIRED);
    if (!dto?.title) throw new BadRequestException(TITLE_REQUIRED);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);

    return await this.service.update(dto);
  }
}
