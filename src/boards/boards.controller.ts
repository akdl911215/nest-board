import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoardsServiceInterface } from './interfaces/BoardsServiceInterface';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  BoardsListInputDto,
  BoardsListOutputDto,
} from './dtos/boards.list.dto';

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
  @ApiResponse({ status: 400, description: `$` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async list(
    @Query() dto: BoardsListInputDto,
  ): Promise<BoardsListOutputDto> {
    return this.service.list(dto);
  }
}
