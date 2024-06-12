import { Test, TestingModule } from '@nestjs/testing';
import { ViewedBoardsService } from './viewed.boards.service';

describe('ViewedBoardsService', () => {
  let service: ViewedBoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewedBoardsService],
    }).compile();

    service = module.get<ViewedBoardsService>(ViewedBoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
