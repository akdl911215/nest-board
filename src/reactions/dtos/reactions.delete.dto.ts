import { PickType } from '@nestjs/swagger';
import { ReactionsBaseDto } from './reactions.base.dto';

export class ReactionsDeleteInputDto extends PickType(ReactionsBaseDto, [
  'id',
  'boardId',
] as const) {}

export type ReactionsDeleteOutputDto = { readonly reactionDelete: boolean };
