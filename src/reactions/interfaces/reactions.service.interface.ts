import {
  ReactionsRegisterInputDto,
  ReactionsRegisterOutputDto,
} from '../dtos/reactions.register.dto';

export interface ReactionsServiceInterface {
  readonly reaction: (
    dto: ReactionsRegisterInputDto,
  ) => Promise<ReactionsRegisterOutputDto | null>;
}
