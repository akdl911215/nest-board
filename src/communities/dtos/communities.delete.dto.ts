import { PickType } from '@nestjs/swagger';
import { CommunitiesBaseDto } from './communities.base.dto';

export class CommunitiesDeleteInputDto extends PickType(CommunitiesBaseDto, [
  'id',
] as const) {}

export type CommunitiesDeleteOutputDto = { readonly delete: boolean };
