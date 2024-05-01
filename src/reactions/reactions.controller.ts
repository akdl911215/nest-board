import { Body, Controller, Delete, Inject, Patch } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReactionsServiceInterface } from './interfaces/reactions.service.interface';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  ReactionsUpdateInputDto,
  ReactionsUpdateOutputDto,
} from './dtos/reactions.update.dto';
import {
  ReactionsDeleteInputDto,
  ReactionsDeleteOutputDto,
} from './dtos/reactions.delete.dto';

@ApiTags('reactions')
@Controller('reactions')
export class ReactionsController {
  constructor(
    @Inject('SERVICE') private readonly service: ReactionsServiceInterface,
  ) {}

  @Patch('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'REACTIONS CREATE AND UPDATE API',
    description: '리액션 등록 및 업데이트 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async update(
    @Body() dto: ReactionsUpdateInputDto,
  ): Promise<ReactionsUpdateOutputDto> {
    return await this.service.update(dto);
  }

  @Delete('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'REACTIONS DELETE API',
    description: '리액션 삭제 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: ReactionsDeleteInputDto,
  ): Promise<ReactionsDeleteOutputDto> {
    return await this.service.delete(dto);
  }
}
