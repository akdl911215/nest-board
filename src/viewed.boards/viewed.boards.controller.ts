import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
import { ViewedBoardsServiceInterface } from './interfaces/viewed.boards.service.interface';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  ViewedBoardsGetRecentViewedBoardsInputDto,
  ViewedBoardsGetRecentViewedBoardsOutputDto,
} from './dtos/viewed.boards.get.recent.viewed.boards.dto';
import {
  BOARD_ID_REQUIRED,
  USER_ID_REQUIRED,
} from '../_common/constant/errors/400';
import { JwtAccessGuard } from '../users/infrastructure/token/guards/jwt.access.guard';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import {
  ViewedBoardsLogViewedBoardInputDto,
  ViewedBoardsLogViewedBoardOutputDto,
} from './dtos/viewed.boards.log.viewed.board.dto';

@ApiTags('viewed/boards')
@Controller('viewed/boards')
export class ViewedBoardsController {
  constructor(private readonly service: ViewedBoardsServiceInterface) {}

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'GET RECENT VIEWED BOARD LIST API',
    description: '최근 조회한 게시판 리스트 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${USER_ID_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async getRecentViewedBoards(
    @Query() dto: ViewedBoardsGetRecentViewedBoardsInputDto,
  ): Promise<ViewedBoardsGetRecentViewedBoardsOutputDto> {
    if (!dto?.userId) throw new BadRequestException(USER_ID_REQUIRED);

    return await this.service.getRecentViewedBoards(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'LOG VIEWED BOARD API',
    description: '조회한 게시판 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${USER_ID_REQUIRED}, ${BOARD_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async logViewedBoard(
    @Body() dto: ViewedBoardsLogViewedBoardInputDto,
  ): Promise<ViewedBoardsLogViewedBoardOutputDto> {
    if (!dto?.userId) throw new BadRequestException(USER_ID_REQUIRED);
    if (!dto?.boardId) throw new BadRequestException(BOARD_ID_REQUIRED);

    return await this.service.logViewedBoard(dto);
  }
}
