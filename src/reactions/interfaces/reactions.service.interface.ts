import {
  ReactionsRegisterInputDto,
  ReactionsRegisterOutputDto,
} from '../dtos/reactions.register.dto';
import {
  ReactionsCountInputDto,
  ReactionsCountOutputDto,
} from '../dtos/reactions.count.dto';
import {
  ReactionsListInputDto,
  ReactionsListOutputDto,
} from '../dtos/reactions.list.dto';

export interface ReactionsServiceInterface {
  readonly reaction: (
    dto: ReactionsRegisterInputDto,
  ) => Promise<ReactionsRegisterOutputDto | null>;

  readonly count: (
    dto: ReactionsCountInputDto,
  ) => Promise<ReactionsCountOutputDto>;

  readonly list: (
    dto: ReactionsListInputDto,
  ) => Promise<ReactionsListOutputDto>;
}
