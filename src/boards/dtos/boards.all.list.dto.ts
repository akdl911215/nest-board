import { ApiProperty } from '@nestjs/swagger';
import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';
import { Boards } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class BoardsAllListInputDto extends BaseCursorPaginationInputDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  public readonly category?: Boards['category'];
}

export type BoardsAllListOutputDto = BaseCursorPaginationOutputDto<Boards>;
