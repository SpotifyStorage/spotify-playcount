import { Test, TestingModule } from '@nestjs/testing';
import { PlaycountDatabaseService } from './playcount-database.service';

describe('PlaycountDatabaseService', () => {
  let service: PlaycountDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaycountDatabaseService],
    }).compile();

    service = module.get<PlaycountDatabaseService>(PlaycountDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
