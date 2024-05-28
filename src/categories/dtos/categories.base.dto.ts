import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';

export class CategoriesBaseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: Categories['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly name!: Categories['name'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly description: Categories['description'];

  @IsDate()
  public readonly createdAt!: Categories['created_at'];

  @IsDate()
  public readonly updatedAt!: Categories['updated_at'];

  @IsDate()
  public readonly deletedAt?: Categories['deleted_at'];
}
