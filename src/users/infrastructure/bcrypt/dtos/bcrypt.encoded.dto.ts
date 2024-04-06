export type BcryptEncodedInputDto = {
  readonly password: string;
};

export class BcryptEncodedOutputDto {
  public readonly encoded!: string;
}
