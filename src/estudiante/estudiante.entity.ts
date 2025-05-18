import { ActividadEntity } from '../actividad/actividad.entity';
import { ReseniaEntity } from '../resenia/resenia.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  numCedula: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  programa: string;

  @Column()
  semestre: number;

  @ManyToMany(() => ActividadEntity, (actividad) => actividad.estudiantes)
  @JoinTable()
  actividades: ActividadEntity[];

  @OneToMany(() => ReseniaEntity, (resenia) => resenia.estudiante)
  resenias: ReseniaEntity[];
}
