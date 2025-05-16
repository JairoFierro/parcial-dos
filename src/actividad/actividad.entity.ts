import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { ReseniaEntity } from 'src/resenia/resenia.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ActividadEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column()
  fecha: string;

  @Column()
  cupoMaximo: number;

  @Column()
  estado: number;

  @ManyToMany(() => EstudianteEntity, (estudiante) => estudiante.actividades)
  estudiantes: EstudianteEntity[];

  @OneToMany(() => ReseniaEntity, (resenia) => resenia.actividad)
  resenias: ReseniaEntity[];
}
