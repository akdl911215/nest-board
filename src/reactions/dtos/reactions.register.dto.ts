import { PickType } from '@nestjs/swagger';
import { ReactionsBaseDto } from './reactions.base.dto';
import { Reactions } from '@prisma/client';

export class ReactionsRegisterInputDto extends PickType(ReactionsBaseDto, [
  'type',
  'boardId',
  'userId',
  'reactionTarget',
] as const) {}

export type ReactionsRegisterOutputDto = Reactions;
