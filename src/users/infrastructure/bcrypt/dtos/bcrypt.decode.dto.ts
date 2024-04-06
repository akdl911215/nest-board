export type BcryptDecodedInputDto = {
  readonly password: string;
  readonly hashPassword: string;
};

export type BcryptDecodedOutputDto = {
  readonly decoded: boolean;
};
