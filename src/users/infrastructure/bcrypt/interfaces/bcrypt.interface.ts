import {
  BcryptDecodedInputDto,
  BcryptDecodedOutputDto,
} from '../dtos/bcrypt.decode.dto';
import {
  BcryptEncodedInputDto,
  BcryptEncodedOutputDto,
} from '../dtos/bcrypt.encoded.dto';

export interface BcryptInterface {
  readonly decoded: (
    dto: BcryptDecodedInputDto,
  ) => Promise<BcryptDecodedOutputDto>;

  readonly encoded: (
    dto: BcryptEncodedInputDto,
  ) => Promise<BcryptEncodedOutputDto>;
}
