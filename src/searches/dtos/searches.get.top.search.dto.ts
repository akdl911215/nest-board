interface searchReturnValue {
  readonly query: string;
  readonly count: number;
}
export type SearchesGetTopSearchOutputDto = searchReturnValue[];
