import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadEntity } from '../actividad/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { Repository } from 'typeorm';
import {
  BussinessError,
  BussinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class EstudianteActividadService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,

    @InjectRepository(ActividadEntity)
    private readonly actividadRepository: Repository<ActividadEntity>,
  ) {}

  async InscribirseActividad(
    estudianteID: number,
    actividadID: number,
  ): Promise<ActividadEntity> {
    const actividad = await this.actividadRepository.findOne({
      where: { id: actividadID },
      relations: ['estudiantes', 'resenias'],
    });
    if (!actividad)
      throw new BussinessLogicException(
        'La actividad con el id dado no fue encontrada',
        BussinessError.NOT_FOUND,
      );

    if (actividad.estudiantes.length >= actividad.cupoMaximo) {
      throw new BussinessLogicException(
        'El cupo maximo de la actividad fue alcanzado',
        BussinessError.PRECONDITION_FAILED,
      );
    }
    if (actividad.estado !== 0) {
      throw new BussinessLogicException(
        'El estado de la actividad no es valido',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    if (actividad.estudiantes.find((e) => e.id === estudianteID))
      throw new BussinessLogicException(
        'El estudiante ya se encuentra inscrito en la actividad',
        BussinessError.PRECONDITION_FAILED,
      );

    const estudiante = await this.estudianteRepository.findOne({
      where: { id: estudianteID },
      relations: ['artworks', 'exhibitions'],
    });
    if (!estudiante)
      throw new BussinessLogicException(
        'El estudiante con el id dado no fue encontrado',
        BussinessError.NOT_FOUND,
      );

    actividad.estudiantes = [...actividad.estudiantes, estudiante];
    return await this.actividadRepository.save(actividad);
  }
}
