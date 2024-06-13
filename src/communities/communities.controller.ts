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
import { CommunitiesServiceInterface } from './interfaces/communities.service.interface';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  CommunitiesListInputDto,
  CommunitiesListOutputDto,
} from './dtos/communities.list.dto';
import {
  DESCRIPTION_REQUIRED,
  NAME_REQUIRED,
  PAGE_REQUIRED,
  QUERY_REQUIRED,
  TAKE_REQUIRED,
  UNIQUE_ID_REQUIRED,
  VISIBILITY_REQUIRED,
} from '../_common/constant/errors/400';
import {
  CommunitiesInquiryInputDto,
  CommunitiesInquiryOutputDto,
} from './dtos/communities.inquiry.dto';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import {
  CommunitiesRegisterInputDto,
  CommunitiesRegisterOutputDto,
} from './dtos/communities.register.dto';
import {
  CommunitiesDeleteInputDto,
  CommunitiesDeleteOutputDto,
} from './dtos/communities.delete.dto';
import {
  CommunitiesUpdateInputDto,
  CommunitiesUpdateOutputDto,
} from './dtos/communities.update.dto';
import { NOTFOUND_COMMUNITY } from '../_common/constant/errors/404';
import { EXISTING_COMMUNITY } from '../_common/constant/errors/409';
import { JwtAccessGuard } from '../users/infrastructure/token/guards/jwt.access.guard';
import {
  SearchesGetSearchCommunitiesInputDto,
  SearchesGetSearchCommunitiesOutputDto,
} from '../searches/dtos/searches.get.search.communities.dto';
import {
  CommunitiesGetCommunitiesNameInputDto,
  CommunitiesGetCommunitiesNameOutputDto,
} from './dtos/communities.get.communities.name.dto';

@ApiTags('communities')
@Controller('communities')
export class CommunitiesController {
  constructor(
    @Inject('SERVICE') private readonly service: CommunitiesServiceInterface,
  ) {}

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMUNITIES LIST API',
    description: '커뮤니티 리스트 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${TAKE_REQUIRED}, ${PAGE_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async list(
    @Query() dto: CommunitiesListInputDto,
  ): Promise<CommunitiesListOutputDto> {
    if (!dto?.take || dto.take < 1)
      throw new BadRequestException(TAKE_REQUIRED);
    if (!dto?.page || dto.page < 1)
      throw new BadRequestException(PAGE_REQUIRED);

    return await this.service.list(dto);
  }

  @Get('/get/communities/name/:name')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'SEARCH COMMUNITY NAME LIST API',
    description: '커뮤니티 리스트 이름 검색 결과 조회',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${NAME_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async getCommunitiesName(
    @Param() dto: CommunitiesGetCommunitiesNameInputDto,
  ): Promise<CommunitiesGetCommunitiesNameOutputDto> {
    if (!dto?.name) throw new BadRequestException(NAME_REQUIRED);

    return await this.service.getCommunitiesName(dto);
  }

  @Get('/:id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMUNITY INQUIRY AP',
    description: '커뮤니티 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${UNIQUE_ID_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async inquiry(
    @Param() dto: CommunitiesInquiryInputDto,
  ): Promise<CommunitiesInquiryOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);

    return await this.service.inquiry(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMUNITY REGISTER API',
    description: '커뮤니티 등록 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${NAME_REQUIRED}, ${DESCRIPTION_REQUIRED}, ${VISIBILITY_REQUIRED}`,
  })
  @ApiResponse({ status: 409, description: `${EXISTING_COMMUNITY}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: CommunitiesRegisterInputDto,
  ): Promise<CommunitiesRegisterOutputDto> {
    if (!dto?.name) throw new BadRequestException(NAME_REQUIRED);
    if (!dto?.description) throw new BadRequestException(DESCRIPTION_REQUIRED);
    if (!dto?.visibility) throw new BadRequestException(VISIBILITY_REQUIRED);

    return await this.service.register(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Patch('/delete')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMUNITY DELETE API',
    description: '커뮤니티 삭제 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${UNIQUE_ID_REQUIRED}` })
  @ApiResponse({ status: 404, description: `${NOTFOUND_COMMUNITY}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: CommunitiesDeleteInputDto,
  ): Promise<CommunitiesDeleteOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);

    return await this.service.delete(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Patch('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMUNITY UPDATE API',
    description: '커뮤니티 업데이트 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${UNIQUE_ID_REQUIRED}, ${NAME_REQUIRED}, ${DESCRIPTION_REQUIRED}, ${VISIBILITY_REQUIRED}`,
  })
  @ApiResponse({ status: 404, description: `${NOTFOUND_COMMUNITY}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async update(
    @Body() dto: CommunitiesUpdateInputDto,
  ): Promise<CommunitiesUpdateOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.name) throw new BadRequestException(NAME_REQUIRED);
    if (!dto?.description) throw new BadRequestException(DESCRIPTION_REQUIRED);
    if (!dto?.visibility) throw new BadRequestException(VISIBILITY_REQUIRED);

    return await this.service.update(dto);
  }
}
