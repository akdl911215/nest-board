import { PickType } from '@nestjs/swagger';
import { ReactionsBaseDto } from './reactions.base.dto';

export class ReactionsCountInputDto extends PickType(ReactionsBaseDto, [
  'boardId',
] as const) {}

export type ReactionsCountOutputDto = {
  readonly count: number;
  readonly board_score: number;
};
