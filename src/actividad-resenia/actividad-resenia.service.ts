import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { ReseniaEntity } from 'src/resenia/resenia.entity';
import { Repository } from 'typeorm';
import {
  BussinessError,
  BussinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class ActividadReseniaService {
  constructor(
    @InjectRepository(ActividadEntity)
    private readonly actividadRepository: Repository<ActividadEntity>,

    @InjectRepository(ReseniaEntity)
    private readonly reseniaRepository: Repository<ReseniaEntity>,
  ) {}

  async agregarReseña(newResenia: ReseniaEntity): Promise<ReseniaEntity> {
    const actividad = await this.actividadRepository.findOne({
      where: { id: newResenia.actividad.id },
      relations: ['estudiantes', 'resenias'],
    });

    if (!actividad)
      throw new BussinessLogicException(
        'La actividad no fue encontrada',
        BussinessError.NOT_FOUND,
      );

    if (actividad.estado === 2) {
      throw new BussinessLogicException(
        'La actividad no está finalizada',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    const estudianteInscrito = actividad.estudiantes.find(
      (e) => e.id === newResenia.estudiante.id,
    );

    if (!estudianteInscrito) {
      throw new BussinessLogicException(
        'El estudiante no estuvo inscrito en la actividad',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    const resenia = this.reseniaRepository.save(newResenia);
    return resenia;
  }
}
