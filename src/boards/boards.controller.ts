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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
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
  IDENTIFIER_ID_REQUIRED,
  NICKNAME_REQUIRED,
  TAKE_REQUIRED,
  TITLE_REQUIRED,
  TYPE_REQUIRED,
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
import {
  BoardsReadInputDto,
  BoardsReadOutputDto,
} from './dtos/boards.read.dto';
import { NOTFOUND_BOARD } from '../_common/constant/errors/404';
import { JwtAccessGuard } from 'src/users/infrastructure/token/guards/jwt.access.guard';
import {
  BoardsAllListInputDto,
  BoardsAllListOutputDto,
} from './dtos/boards.all.list.dto';
import {
  BoardsPopularListInputDto,
  BoardsPopularListOutputDto,
} from './dtos/boards.popular.list.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    @Inject('SERVICE') private readonly service: BoardsServiceInterface,
  ) {}

  @Get('/list')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARDS HOME LIST API',
    description: '게시판 홈 리스트 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${TAKE_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async list(
    @Query() dto: BoardsListInputDto,
  ): Promise<BoardsListOutputDto> {
    if (!dto?.take || dto.take < 0)
      throw new BadRequestException(TAKE_REQUIRED);
    console.log('list dto : ', dto);

    return await this.service.list(dto);
  }

  @Get('/list/all')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARDS ALL LIST API',
    description: '게시판 모든 리스트 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${TAKE_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async allList(
    @Query() dto: BoardsAllListInputDto,
  ): Promise<BoardsAllListOutputDto> {
    if (!dto?.take || dto.take < 0)
      throw new BadRequestException(TAKE_REQUIRED);

    return await this.service.allList(dto);
  }

  @Get('/list/popular')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARDS POPULAR LIST API',
    description: '게시판 인기 리스트 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${TAKE_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async popularList(
    @Query() dto: BoardsPopularListInputDto,
  ): Promise<BoardsPopularListOutputDto> {
    if (!dto?.take || dto.take < 0)
      throw new BadRequestException(TAKE_REQUIRED);

    return await this.service.popularList(dto);
  }

  @Get('/read')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARDS READ API',
    description: '게시판 글 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${UNIQUE_ID_REQUIRED}, ${TITLE_REQUIRED}`,
  })
  @ApiResponse({ status: 404, description: `${NOTFOUND_BOARD}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async read(
    @Query() dto: BoardsReadInputDto,
  ): Promise<BoardsReadOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.title) throw new BadRequestException(TITLE_REQUIRED);

    return await this.service.read(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'BOARDS REGISTER API',
    description: '게시판 등록 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${CATEGORY_REQUIRED}, ${NICKNAME_REQUIRED}, ${IDENTIFIER_ID_REQUIRED}, ${TYPE_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: BoardsRegisterInputDto,
  ): Promise<BoardsRegisterOutputDto> {
    if (!dto?.category) throw new BadRequestException(CATEGORY_REQUIRED);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);
    if (!dto?.identifierId)
      throw new BadRequestException(IDENTIFIER_ID_REQUIRED);
    if (!dto?.type) throw new BadRequestException(TYPE_REQUIRED);

    return await this.service.register(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
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
  @ApiResponse({
    status: 400,
    description: `${NICKNAME_REQUIRED}, ${NICKNAME_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: BoardsDeleteInputDto,
  ): Promise<BoardsDeleteOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);

    return await this.service.delete(dto);
  }

  @Get('/:id')
  @UseGuards(JwtAccessGuard)
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

    const res = await this.service.inquiry(dto);

    return res;
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
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
