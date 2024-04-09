import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { Boards } from '@prisma/client';

export class BoardsBaseDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: Boards['id'];

  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly identifierId!: Boards['identifier_id'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly title!: Boards['title'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly nickname!: Boards['nickname'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  public readonly content?: Boards['content'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  public readonly category?: Boards['category'];

  @IsDate()
  public readonly createdAt!: Boards['created_at'];

  @IsDate()
  public readonly updatedAt!: Boards['updated_at'];

  @IsDate()
  public readonly deletedAt?: Boards['deleted_at'];
}
