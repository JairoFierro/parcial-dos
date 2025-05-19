import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

describe('ActividadService', () => {
  let service: ActividadService;
  let repository: Repository<ActividadEntity>;
  let repositoryEstudiante: Repository<EstudianteEntity>;
  let actividadesList: ActividadEntity[];
  let estudiantesList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get<Repository<ActividadEntity>>(
      getRepositoryToken(ActividadEntity),
    );
    repositoryEstudiante = module.get<Repository<EstudianteEntity>>(
      getRepositoryToken(EstudianteEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();

    estudiantesList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante = await repositoryEstudiante.save({
        numCedula: faker.number.int({ min: 1, max: 10 }),
        nombre: faker.person.firstName(),
        correo: faker.internet.email(),
        programa: faker.lorem.word(),
        semestre: faker.number.int({ min: 1, max: 10 }),
      });
      estudiantesList.push(estudiante);
    }

    actividadesList = [];
    for (let i = 0; i < 5; i++) {
      const actividad = await repository.save({
        titulo: faker.lorem.sentence(),
        fecha: faker.date.recent().toISOString(),
        cupoMaximo: faker.number.int({ min: 1, max: 100 }),
        estado: faker.number.int({ min: 1, max: 3 }),
        estudiantes: estudiantesList.slice(0, 5),
        resenias: [],
      });
      actividadesList.push(actividad);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Pruebas para crear una actividad
  it('crearActividad debería crear una actividad válida', async () => {
    const actividad: ActividadEntity = {
      id: 0,
      titulo: 'Concierto de musica andina',
      fecha: '2025-05-20',
      cupoMaximo: 50,
      estado: 0,
      estudiantes: [],
      resenias: [],
    };

    const nueva = await service.crearActividad(actividad);
    expect(nueva).toBeDefined();
    expect(nueva.titulo).toBe(actividad.titulo);
  });

  it('crearActividad debería lanzar error si el título es muy corto', async () => {
    const actividad: ActividadEntity = {
      id: 0,
      titulo: 'Muy corto',
      fecha: '2025-05-20',
      cupoMaximo: 50,
      estado: 0,
      estudiantes: [],
      resenias: [],
    };

    await expect(service.crearActividad(actividad)).rejects.toThrowError(
      'La actividad no es valida',
    );
  });

  it('cambiarEstado debería cambiar el estado a CERRADA si hay 80% de inscritos', async () => {
    const actividad = await repository.save({
      titulo: 'Obra de teatro clásica',
      fecha: '2025-05-21',
      cupoMaximo: 5,
      estado: 0,
      estudiantes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }], // simulación: 4 inscritos
      resenias: [],
    });

    const actualizada = await service.cambiarEstado(actividad.id, 1);
    expect(actualizada.estado).toBe(1);
  });

  it('cambiarEstado debería lanzar error si se quiere cerrar con menos del 80% del cupo', async () => {
    const actividad = await repository.save({
      titulo: 'Taller de pintura',
      fecha: '2025-05-22',
      cupoMaximo: 5,
      estado: 0,
      estudiantes: estudiantesList.slice(0, 3), // simulación: 2 inscritos
      resenias: [],
    });

    await expect(service.cambiarEstado(actividad.id, 1)).rejects.toHaveProperty(
      'message',
      'Menos del 80% de cupo ocupado',
    );
  });

  it('findAllActividadesByDate debería retornar actividades con la fecha dada', async () => {
    const fecha = '2025-05-25';
    await repository.save({
      titulo: 'Exposición de arte',
      fecha,
      cupoMaximo: 20,
      estado: 0,
    });

    const actividades = await service.findAllActividadesByDate(fecha);
    expect(actividades).toHaveLength(1);
    expect(actividades[0].fecha).toBe(fecha);
  });

  it('findAllActividadesByDate debería retornar arreglo vacío si no hay coincidencias', async () => {
    const actividades = await service.findAllActividadesByDate('2099-12-31');
    expect(actividades).toEqual([]);
  });
});
