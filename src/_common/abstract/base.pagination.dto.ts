import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseOffsetPaginationInputDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    default: 1,
  })
  public readonly page!: number;

  // 리스트 행 갯수
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    default: 10,
  })
  public readonly take!: number;
}

export class BaseCursorPaginationInputDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    default: 1,
  })
  public readonly take!: number;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
  })
  public readonly lastId?: string;
}

export class BaseOffsetPaginationOutputDto<T> {
  @Type(() => Number)
  @IsNumber()
  public readonly current_page!: number;

  @Type(() => Number)
  @IsNumber()
  public readonly total_pages!: number;

  @Type(() => Number)
  @IsNumber()
  public readonly total_take!: number;

  @Type(() => Array)
  @IsArray()
  public readonly current_list!: T[];
}

export class BaseCursorPaginationOutputDto<T> {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ type: Number })
  public readonly total_count!: number;

  @Type(() => Array)
  @ApiProperty({ type: Array })
  public readonly current_list: T[];
}
