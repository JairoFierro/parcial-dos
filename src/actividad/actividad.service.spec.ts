import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('ActividadService', () => {
  let service: ActividadService;
  let repository: Repository<ActividadEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get<Repository<ActividadEntity>>(
      getRepositoryToken(ActividadEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
