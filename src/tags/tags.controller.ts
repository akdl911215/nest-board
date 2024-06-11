import { Controller, Get } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TagsServiceInterface } from './interfaces/tags.service.interface';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import { TagsListOutputDto } from './dtos/tags.list.dto';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly service: TagsServiceInterface) {}

  @Get('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'TAGS LIST API',
    description: '태그 리스트 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async list(): Promise<TagsListOutputDto> {
    return await this.service.list();
  }
}
