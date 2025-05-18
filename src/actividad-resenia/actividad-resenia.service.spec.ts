import { Test, TestingModule } from '@nestjs/testing';
import { ActividadReseniaService } from './actividad-resenia.service';

describe('ActividadReseniaService', () => {
  let service: ActividadReseniaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActividadReseniaService],
    }).compile();

    service = module.get<ActividadReseniaService>(ActividadReseniaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
