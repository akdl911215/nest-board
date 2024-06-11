import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CimmunityVisibilityType, Communities } from '@prisma/client';

export class CommunitiesBaseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: Communities['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly name!: Communities['name'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly description!: Communities['description'];

  @IsEnum(CimmunityVisibilityType)
  @ApiProperty({
    enum: ['PUBLIC', 'RESTRICTED', 'PRIVATE'],
  })
  public readonly visibility!: Communities['visibility'];

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  public readonly banner?: Communities['banner'];

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  public readonly icon?: Communities['icon'];

  @IsDate()
  public readonly createdAt!: Communities['created_at'];

  @IsDate()
  public readonly updatedAt!: Communities['updated_at'];

  @IsDate()
  public readonly deletedAt?: Communities['deleted_at'];
}
