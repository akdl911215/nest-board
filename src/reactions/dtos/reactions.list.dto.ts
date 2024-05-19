import { PickType } from '@nestjs/swagger';
import { ReactionsBaseDto } from './reactions.base.dto';
import { Reactions } from '@prisma/client';

export class ReactionsListInputDto extends PickType(ReactionsBaseDto, [
  'boardId',
] as const) {}

export type ReactionsListOutputDto = Reactions[];
