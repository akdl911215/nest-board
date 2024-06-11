import { PickType } from '@nestjs/swagger';
import { TagsBaseDto } from './tags.base.dto';
import { Tags } from '@prisma/client';

export class TagsRegisterInputDto extends PickType(TagsBaseDto, [
  'name',
] as const) {}

export type TagsRegisterOutputDto = Tags;
