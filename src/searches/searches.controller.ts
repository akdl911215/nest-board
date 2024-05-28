import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';

import { SearchesServiceInterface } from './interfaces/searches.service.interface';
import {
  SearchesAddSearchInputDto,
  SearchesAddSearchOutputDto,
} from './dtos/searches.add.search.dto';
import { SearchesGetTopSearchOutputDto } from './dtos/searches.get.top.search.dto';
import { QUERY_REQUIRED } from '../_common/constant/errors/400';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';

@ApiTags('searches')
@Controller('searches')
export class SearchesController {
  constructor(
    @Inject('SERVICE') private readonly service: SearchesServiceInterface,
  ) {}

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'ADD SEARCH API',
    description: '검색 결과 추가 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({ status: 400, description: `${QUERY_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async addSearch(
    @Body() dto: SearchesAddSearchInputDto,
  ): Promise<SearchesAddSearchOutputDto> {
    if (!dto?.query) throw new BadRequestException(QUERY_REQUIRED);

    await this.service.addSearch(dto);
  }

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'TOP 10 SEARCHES API',
    description: '탑 10 검색어 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async getTopSearches(): Promise<SearchesGetTopSearchOutputDto> {
    return await this.service.getTopSearch();
  }
}
