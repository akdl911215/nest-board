import {
  CategoriesListInputDto,
  CategoriesListOutputDto,
} from '../dtos/categories.list.dto';
import {
  CategoriesRegisterInputDto,
  CategoriesRegisterOutputDto,
} from '../dtos/categories.register.dto';

export interface CategoriesServiceInterface {
  readonly list: (
    dto: CategoriesListInputDto,
  ) => Promise<CategoriesListOutputDto>;

  readonly register: (
    dto: CategoriesRegisterInputDto,
  ) => Promise<CategoriesRegisterOutputDto>;
}
