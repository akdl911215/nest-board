import { PickType } from '@nestjs/swagger';
import { CategoriesBaseDto } from './categories.base.dto';
import { Categories } from '@prisma/client';

export class CategoriesRegisterInputDto extends PickType(CategoriesBaseDto, [
  'name',
  'description',
] as const) {}

export type CategoriesRegisterOutputDto = Categories;
