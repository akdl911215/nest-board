import { Injectable } from '@nestjs/common';
import { BcryptInterface } from './interfaces/bcrypt.interface';
import {
  BcryptDecodedInputDto,
  BcryptDecodedOutputDto,
} from './dtos/bcrypt.decode.dto';
import {
  BcryptEncodedInputDto,
  BcryptEncodedOutputDto,
} from './dtos/bcrypt.encoded.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptService implements BcryptInterface {
  constructor(private readonly configService: ConfigService) {}
  public async decoded(
    dto: BcryptDecodedInputDto,
  ): Promise<BcryptDecodedOutputDto> {
    // password: 입력한 비밀번호
    // hashPassword: DB에 저장된 비밀번호

    const { password, hashPassword } = dto;

    const decodePassword: boolean = await bcrypt.compare(
      password,
      hashPassword,
    );

    return { decoded: decodePassword };
  }

  public async encoded(
    dto: BcryptEncodedInputDto,
  ): Promise<BcryptEncodedOutputDto> {
    const { password } = dto;

    const encodedPassword: string = await bcrypt.hash(
      password,
      Number(this.configService.get<number>('BCRYPT_SOLT_NUMBER')),
    );

    return { encoded: encodedPassword };
  }
}
