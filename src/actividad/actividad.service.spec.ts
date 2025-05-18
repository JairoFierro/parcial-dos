import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('ActividadService', () => {
  let service: ActividadService;
  let repository: Repository<ActividadEntity>;
  let actividadesList: ActividadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get<Repository<ActividadEntity>>(
      getRepositoryToken(ActividadEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    actividadesList = [];
    for (let i = 0; i < 5; i++) {
      const actividad = await repository.save({
        titulo: faker.lorem.sentence(),
        fecha: faker.date.recent().toISOString(), 
        cupoMaximo: faker.number.int({ min: 1, max: 100 }),
        estado: faker.number.int({ min: 1, max: 3 }),
      });
      actividadesList.push(actividad);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
