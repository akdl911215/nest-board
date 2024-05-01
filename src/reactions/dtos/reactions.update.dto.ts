import { PickType } from '@nestjs/swagger';
import { ReactionsBaseDto } from './reactions.base.dto';
import { Reactions } from '@prisma/client';

export class ReactionsUpdateInputDto extends PickType(ReactionsBaseDto, [
  'id',
  'type',
  'boardId',
] as const) {}

export type ReactionsUpdateOutputDto = Reactions;
