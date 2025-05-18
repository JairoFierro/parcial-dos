import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntity } from '../../actividad/actividad.entity';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { ReseniaEntity } from '../../resenia/resenia.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [ActividadEntity, EstudianteEntity, ReseniaEntity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([ActividadEntity, EstudianteEntity, ReseniaEntity]),
];
