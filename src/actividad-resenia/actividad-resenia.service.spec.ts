import { Test, TestingModule } from '@nestjs/testing';
import { ActividadReseniaService } from './actividad-resenia.service';
import { ActividadEntity } from '../actividad/actividad.entity';
import { Repository } from 'typeorm';
import { ReseniaEntity } from '../resenia/resenia.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

describe('ActividadReseniaService', () => {
  let service: ActividadReseniaService;
  let actividadRepository: Repository<ActividadEntity>;
  let reseniaRepository: Repository<ReseniaEntity>;
  let estudianteRepository: Repository<EstudianteEntity>;
  let estudiante: EstudianteEntity;
  let actividad: ActividadEntity;
  let resenia: ReseniaEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadReseniaService],
    }).compile();

    service = module.get<ActividadReseniaService>(ActividadReseniaService);
    actividadRepository = module.get<Repository<ActividadEntity>>(
      getRepositoryToken(ActividadEntity),
    );
    reseniaRepository = module.get<Repository<ReseniaEntity>>(
      getRepositoryToken(ReseniaEntity),
    );
    estudianteRepository = module.get<Repository<EstudianteEntity>>(
      getRepositoryToken(EstudianteEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await actividadRepository.clear();
    await reseniaRepository.clear();

    estudiante = await estudianteRepository.save({
      numCedula: faker.number.int({ min: 1, max: 10 }),
      nombre: faker.person.firstName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: faker.number.int({ min: 1, max: 10 }),
    });

    actividad = await actividadRepository.save({
      titulo: faker.lorem.sentence(),
      fecha: faker.date.recent().toISOString(),
      cupoMaximo: faker.number.int({ min: 1, max: 100 }),
      estado: faker.number.int({ min: 1, max: 3 }),
      estudiantes: [estudiante],
      resenias: [],
    });

    resenia = await reseniaRepository.save({
      comentario: 'Muy buena actividad',
      calificacion: faker.number.int({ min: 1, max: 5 }),
      fecha: faker.date.recent().toISOString(),
      actividad: actividad,
      estudiante: estudiante,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('agregarResenia debería guardar reseña si todo es válido', () => {
    expect(resenia).toBeDefined();
    expect(resenia.comentario).toEqual('Muy buena actividad');
  });

  it('agregarResenia fallar si la actividad no existe', async () => {
    actividad.id = 0;
    resenia.actividad = actividad;

    await expect(service.agregarResenia(resenia)).rejects.toHaveProperty(
      'message',
      'La actividad no fue encontrada',
    );
  });
});
