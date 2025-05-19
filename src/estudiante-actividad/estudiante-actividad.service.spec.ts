import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { ActividadEntity } from '../actividad/actividad.entity';
import { Repository } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('EstudianteActividadService', () => {
  let service: EstudianteActividadService;
  let actividadRepository: Repository<ActividadEntity>;
  let estudianteRepository: Repository<EstudianteEntity>;
  let estudiantes: EstudianteEntity[];
  let actividades: ActividadEntity[];
  let estudianteNew: EstudianteEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteActividadService],
    }).compile();

    service = module.get<EstudianteActividadService>(
      EstudianteActividadService,
    );
    actividadRepository = module.get<Repository<ActividadEntity>>(
      getRepositoryToken(ActividadEntity),
    );
    estudianteRepository = module.get<Repository<EstudianteEntity>>(
      getRepositoryToken(EstudianteEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await actividadRepository.clear();
    await estudianteRepository.clear();

    estudiantes = [];
    for (let i = 0; i < 5; i++) {
      const estudiante = await estudianteRepository.save({
        numCedula: faker.number.int({ min: 1, max: 10 }),
        nombre: faker.person.firstName(),
        correo: faker.internet.email(),
        programa: faker.lorem.word(),
        semestre: faker.number.int({ min: 1, max: 10 }),
      });
      if (i === 0) {
        estudianteNew = estudiante;
      } else {
        estudiantes.push(estudiante);
      }
    }

    actividades = [];
    for (let i = 0; i < 5; i++) {
      const actividad = await actividadRepository.save({
        titulo: faker.lorem.sentence(),
        fecha: faker.date.recent().toISOString(),
        cupoMaximo: faker.number.int({ min: 1, max: 100 }),
        estado: faker.number.int({ min: 1, max: 3 }),
        estudiantes: estudiantes.slice(0, 5),
        resenias: [],
      });
      actividades.push(actividad);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería inscribir al estudiante si todo es válido', async () => {
    const estudiante = estudianteNew;

    const actividad = await actividadRepository.save({
      titulo: 'Taller de pintura',
      fecha: '2025-06-01',
      estado: 0,
      cupoMaximo: 5,
      estudiantes: [],
      resenias: [],
    });

    const actualizada = await service.InscribirseActividad(
      estudiante.id,
      actividad.id,
    );
    expect(actualizada.estudiantes.map((e) => e.id)).toContain(estudiante.id);
  });

  it('falla si la actividad no existe', async () => {
    const estudiante = estudiantes[0];

    await expect(
      service.InscribirseActividad(estudiante.id, 9999),
    ).rejects.toHaveProperty(
      'message',
      'La actividad con el id dado no fue encontrada',
    );
  });
});
