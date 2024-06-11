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
import { CommunityTagsServiceInterface } from './interfaces/community.tags.service.inteface';
import { JwtAccessGuard } from '../users/infrastructure/token/guards/jwt.access.guard';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import {
  COMMUNITY_ID_REQUIRED,
  TAG_ID_REQUIRED,
  TAGS_REQUIRED,
} from '../_common/constant/errors/400';
import { NOTFOUND_BOARD_TAG } from '../_common/constant/errors/404';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  CommunityTagsDeleteInputDto,
  CommunityTagsDeleteOutputDto,
} from './dtos/community.tags.delete.dto';
import {
  CommunityTagsInquiryInputDto,
  CommunityTagsInquiryOutputDto,
} from './dtos/community.tags.inquiry.dto';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import {
  CommunityTagsRegisterInputDto,
  CommunityTagsRegisterOutputDto,
} from './dtos/community.tags.register.dto';

@ApiTags('community/tags')
@Controller('community/tags')
export class CommunityTagsController {
  constructor(
    @Inject('SERVICE') private readonly service: CommunityTagsServiceInterface,
  ) {}

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Delete('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMUNITY TAGS DELETE API',
    description: '커뮤니티 태그 삭제 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${TAG_ID_REQUIRED}, ${COMMUNITY_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 404, description: `${NOTFOUND_BOARD_TAG}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: CommunityTagsDeleteInputDto,
  ): Promise<CommunityTagsDeleteOutputDto> {
    if (!dto?.communityId) throw new BadRequestException(COMMUNITY_ID_REQUIRED);
    if (!dto?.tagId) throw new BadRequestException(TAG_ID_REQUIRED);

    return await this.service.delete(dto);
  }

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMUNITY TAGS LIST INQUIRY API',
    description: '커뮤니티 태그 리스트 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${COMMUNITY_ID_REQUIRED}, ${TAG_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async inquiry(
    @Query() dto: CommunityTagsInquiryInputDto,
  ): Promise<CommunityTagsInquiryOutputDto> {
    if (!dto?.communityId) throw new BadRequestException(COMMUNITY_ID_REQUIRED);
    if (!dto?.tagId) throw new BadRequestException(TAG_ID_REQUIRED);
    return await this.service.inquiry(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'COMMUNITY TAGS LIST REGISTER API',
    description: '커뮤니티 태그 리스트 등록 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${TAGS_REQUIRED}, ${COMMUNITY_ID_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: CommunityTagsRegisterInputDto,
  ): Promise<CommunityTagsRegisterOutputDto> {
    console.log('register dto : ', dto);
    if (!dto?.communityId) throw new BadRequestException(COMMUNITY_ID_REQUIRED);
    if (!dto?.tags.length || dto.tags.length < 1)
      throw new BadRequestException(TAGS_REQUIRED);
    return await this.service.register(dto);
  }
}
