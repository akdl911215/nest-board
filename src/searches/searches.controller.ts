import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
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
import {
  SearchesGetSearchBoardsInputDto,
  SearchesGetSearchBoardsOutputDto,
} from './dtos/searches.get.search.boards.dto';
import {
  SearchesGetSearchCommunitiesInputDto,
  SearchesGetSearchCommunitiesOutputDto,
} from './dtos/searches.get.search.communities.dto';
import {
  SearchesGetSearchMediaInputDto,
  SearchesGetSearchMediaOutputDto,
} from './dtos/searches.get.search.media.dto';
import {
  SearchesGetSearchPeopleInputDto,
  SearchesGetSearchPeopleOutputDto,
} from './dtos/searches.get.search.people.dto';
import {
  SearchesGetSearchCommentsInputDto,
  SearchesGetSearchCommentsOutputDto,
} from './dtos/searches.get.search.comments.dto';

@ApiTags('searches')
@Controller('searches')
export class SearchesController {
  constructor(
    @Inject('SERVICE') private readonly service: SearchesServiceInterface,
  ) {}

  @Get('/get/boards/:query')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'SEARCH BOARDS LIST API',
    description: '보드 리스트 검색 결과 조회',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${QUERY_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async getSearchBoards(
    @Param() dto: SearchesGetSearchBoardsInputDto,
  ): Promise<SearchesGetSearchBoardsOutputDto> {
    if (!dto?.query) throw new BadRequestException(QUERY_REQUIRED);

    return await this.service.getSearchBoards(dto);
  }

  @Get('/get/communities/:query')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'SEARCH COMMUNITY LIST API',
    description: '커뮤니티 리스트 검색 결과 조회',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${QUERY_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async getSearchCommunities(
    @Param() dto: SearchesGetSearchCommunitiesInputDto,
  ): Promise<SearchesGetSearchCommunitiesOutputDto> {
    if (!dto?.query) throw new BadRequestException(QUERY_REQUIRED);

    return await this.service.getSearchCommunities(dto);
  }

  @Get('/get/comments/:query')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'SEARCH COMMENTS LIST API',
    description: '댓글 리스트 검색 결과 조회',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${QUERY_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async getSearchComments(
    @Param() dto: SearchesGetSearchCommentsInputDto,
  ): Promise<SearchesGetSearchCommentsOutputDto> {
    if (!dto?.query) throw new BadRequestException(QUERY_REQUIRED);

    return await this.service.getSearchComments(dto);
  }

  @Get('/get/media/:query')
  @ApiConsumes('applicati on/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'SEARCH MEDIA LIST API',
    description: '미디어 리스트 검색 결과 조회',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${QUERY_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async getSearchMedia(
    @Param() dto: SearchesGetSearchMediaInputDto,
  ): Promise<SearchesGetSearchMediaOutputDto> {
    console.log('media dto : ', dto);
    if (!dto?.query) throw new BadRequestException(QUERY_REQUIRED);

    const res = await this.service.getSearchMedia(dto);
    console.log('res : ', res);

    return res;
  }

  @Get('/get/people/:query')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'SEARCH PEOPLE LIST API',
    description: '유저 리스트 검색 결과 조회',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${QUERY_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async getSearchPeople(
    @Param() dto: SearchesGetSearchPeopleInputDto,
  ): Promise<SearchesGetSearchPeopleOutputDto> {
    if (!dto?.query) throw new BadRequestException(QUERY_REQUIRED);

    return await this.service.getSearchPeople(dto);
  }

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
