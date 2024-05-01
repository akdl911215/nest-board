import {
  ReactionsDeleteOutputDto,
  ReactionsDeleteInputDto,
} from '../dtos/reactions.delete.dto';
import {
  ReactionsUpdateInputDto,
  ReactionsUpdateOutputDto,
} from '../dtos/reactions.update.dto';

export interface ReactionsServiceInterface {
  readonly delete: (
    dto: ReactionsDeleteInputDto,
  ) => Promise<ReactionsDeleteOutputDto>;

  readonly update: (
    dto: ReactionsUpdateInputDto,
  ) => Promise<ReactionsUpdateOutputDto>;
}
