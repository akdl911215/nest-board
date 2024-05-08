import { PickType } from '@nestjs/swagger';
import { ReactionsBaseDto } from './reactions.base.dto';

export class ReactionsCountInputDto extends PickType(ReactionsBaseDto, [
  'boardId',
  'userId',
] as const) {}

export type ReactionsCountOutputDto = number;
