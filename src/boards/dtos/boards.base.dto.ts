import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Boards, BoardType } from '@prisma/client';

export class BoardsBaseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: Boards['id'];

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly identifierId!: Boards['identifier_id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly title!: Boards['title'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly nickname!: Boards['nickname'];

  @IsArray()
  @ApiProperty({
    type: Array,
    default: [],
    required: true,
  })
  public readonly content!: Boards['content'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly category!: Boards['category'];

  @IsEnum(BoardType)
  @IsNotEmpty()
  @ApiProperty({
    enum: ['TEXT', 'LINK', 'MEDIA', 'YOUTUBE'],
  })
  public readonly type!: Boards['type'];

  @IsDate()
  public readonly createdAt!: Boards['created_at'];

  @IsDate()
  public readonly updatedAt!: Boards['updated_at'];

  @IsDate()
  public readonly deletedAt?: Boards['deleted_at'];
}
