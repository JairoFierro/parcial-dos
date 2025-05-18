import { Injectable } from '@nestjs/common';
import { ActividadEntity } from './actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BussinessError,
  BussinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(ActividadEntity)
    private readonly actividadRepository: Repository<ActividadEntity>,
  ) {}

  async crearActividad(
    newActividad: ActividadEntity,
  ): Promise<ActividadEntity> {
    if (newActividad.titulo.length < 15) {
      throw new BussinessLogicException(
        'La actividad no es valida',
        BussinessError.PRECONDITION_FAILED,
      );
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(newActividad.titulo)) {
      throw new BussinessLogicException(
        'El título contiene caracteres inválidos',
        BussinessError.PRECONDITION_FAILED,
      );
    }
    const actividad = this.actividadRepository.save(newActividad);
    return actividad;
  }

  async cambiarEstado(
    actividadID: number,
    newEstado: number,
  ): Promise<ActividadEntity> {
    const persistedActividad = await this.actividadRepository.findOne({
      where: { id: actividadID },
      relations: ['estudiantes', 'resenias'],
    });

    if (!persistedActividad)
      throw new BussinessLogicException(
        'La actividad no fue encontrada',
        BussinessError.NOT_FOUND,
      );

    if (![0, 1, 2].includes(newEstado)) {
      throw new BussinessLogicException(
        'Estado inválido',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    const inscritos = persistedActividad.estudiantes.length;
    const porcentaje = (inscritos / persistedActividad.cupoMaximo) * 100;

    if (newEstado === 1 && porcentaje < 80) {
      throw new BussinessLogicException(
        'Menos del 80% de cupo ocupado',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    if (newEstado === 2 && inscritos < persistedActividad.cupoMaximo) {
      throw new BussinessLogicException(
        'Hay cupos disponibles',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    persistedActividad.estado = newEstado;
    return await this.actividadRepository.save(persistedActividad);
  }

  async findAllActividadesByDate(fecha: string): Promise<ActividadEntity[]> {
    const actividades: ActividadEntity[] = await this.actividadRepository.find({
      where: { fecha },
      relations: ['estudiantes', 'resenias'],
    });

    const actividadesFiltradas = actividades.filter(
      (actividad) => actividad.fecha === fecha,
    );
    return actividadesFiltradas;
  }
}
