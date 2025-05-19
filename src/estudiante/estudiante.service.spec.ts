import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiantesList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(
      getRepositoryToken(EstudianteEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();

    estudiantesList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante = await repository.save({
        numCedula: faker.number.int({ min: 1, max: 10 }),
        nombre: faker.person.firstName(),
        correo: faker.internet.email(),
        programa: faker.lorem.word(),
        semestre: faker.number.int({ min: 1, max: 10 }),
      });
      estudiantesList.push(estudiante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearEstudiante debería guardar estudiante si el correo es válido', async () => {
    const estudiante = estudiantesList[0];
    const result = await service.crearEstudiante(estudiante);
    expect(result).toBeDefined();
    expect(result.correo).toBe(estudiante.correo);
  });

  it('crearEstudiante debería lanzar error si el correo no tiene @', async () => {
    const estudiante = estudiantesList[4];
    estudiante.correo = 'correoSinArroba.com';

    await expect(service.crearEstudiante(estudiante)).rejects.toHaveProperty(
      'message',
      'El correo no es valido',
    );
  });
});
