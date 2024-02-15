import { Test, TestingModule } from '@nestjs/testing';
import { HttpRestService } from './http-rest.service';

describe('HttpRestService', () => {
  let service: HttpRestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpRestService],
    }).compile();

    service = module.get<HttpRestService>(HttpRestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
