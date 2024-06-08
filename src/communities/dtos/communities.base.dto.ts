import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Communities } from '@prisma/client';

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
