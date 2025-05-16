import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BussinessError,
  BussinessLogicException,
} from 'src/shared/business-errors';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async crearEstudiante(
    newEstudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    if (!newEstudiante.correo.includes('@')) {
      throw new BussinessLogicException(
        'El correo no es valido',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    const estudiante = this.estudianteRepository.save(newEstudiante);
    return estudiante;
  }

  async findEstudianteById(id: number): Promise<EstudianteEntity> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['actividades', 'resenias'],
    });
    if (!estudiante) {
      throw new BussinessLogicException(
        'El estudiante con el id dado no existe',
        BussinessError.NOT_FOUND,
      );
    }

    return estudiante;
  }
}
