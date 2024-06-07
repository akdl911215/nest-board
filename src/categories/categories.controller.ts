import {
  BadRequestException,
  Body,
  Controller,
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
import { CategoriesServiceInterface } from './interfaces/categories.service.interface';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  CategoriesListInputDto,
  CategoriesListOutputDto,
} from './dtos/categories.list.dto';
import {
  DESCRIPTION_REQUIRED,
  NAME_REQUIRED,
  PAGE_REQUIRED,
  TAKE_REQUIRED,
} from '../_common/constant/errors/400';
import { JwtAccessGuard } from '../users/infrastructure/token/guards/jwt.access.guard';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import { EXISTING_CATEGORY } from '../_common/constant/errors/409';
import {
  CategoriesRegisterInputDto,
  CategoriesRegisterOutputDto,
} from './dtos/categories.register.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject('SERVICE') private readonly service: CategoriesServiceInterface,
  ) {}

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'CATEGORY LIST API',
    description: '카테고리 리스트 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${TAKE_REQUIRED}, ${PAGE_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async list(
    @Query() dto: CategoriesListInputDto,
  ): Promise<CategoriesListOutputDto> {
    if (!dto?.take || dto.take < 1)
      throw new BadRequestException(TAKE_REQUIRED);
    if (!dto?.page || dto.page < 1)
      throw new BadRequestException(PAGE_REQUIRED);

    return await this.service.list(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'CATEGORY REGISTER API',
    description: '카테고리 등록 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${NAME_REQUIRED}, ${DESCRIPTION_REQUIRED}`,
  })
  @ApiResponse({ status: 409, description: `${EXISTING_CATEGORY}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: CategoriesRegisterInputDto,
  ): Promise<CategoriesRegisterOutputDto> {
    if (!dto?.name) throw new BadRequestException(NAME_REQUIRED);
    if (!dto?.description) throw new BadRequestException(DESCRIPTION_REQUIRED);

    return await this.service.register(dto);
  }
}
