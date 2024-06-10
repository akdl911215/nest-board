import { Test, TestingModule } from '@nestjs/testing';
import { BoardTagsService } from './board.tags.service';

describe('BoardTagsService', () => {
  let service: BoardTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardTagsService],
    }).compile();

    service = module.get<BoardTagsService>(BoardTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
