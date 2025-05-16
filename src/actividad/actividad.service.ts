import { Injectable } from '@nestjs/common';
import { ActividadEntity } from './actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BussinessError,
  BussinessLogicException,
} from 'src/shared/business-errors';

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
    const actividad = this.actividadRepository.save(newActividad);
    return actividad;
  }

  async cambiarEstado(
    actividadID: number,
    estado: string,
  ): Promise<ActividadEntity> {
    const persistedActividad = await this.actividadRepository.findOne({
      where: { actividadID },
    });
    if (!persistedActividad)
      throw new BussinessLogicException(
        'La actividad no fue encontrada',
        BussinessError.NOT_FOUND,
      );

    persistedActividad.estado = estado;
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
