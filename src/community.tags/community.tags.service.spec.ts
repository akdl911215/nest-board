import { Test, TestingModule } from '@nestjs/testing';
import { CommunityTagsService } from './community.tags.service';

describe('CommunityTagsService', () => {
  let service: CommunityTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityTagsService],
    }).compile();

    service = module.get<CommunityTagsService>(CommunityTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
