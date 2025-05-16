import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReseniaEntity } from './resenia.entity';
import { Repository } from 'typeorm';
import { BussinessError, BussinessLogicException } from 'src/shared/business-errors';

@Injectable()
export class ReseniaService {
  constructor(
    @InjectRepository(ReseniaEntity)
    private readonly reseniaRepository: Repository<ReseniaEntity>,
  ) {}

  async agregarReseña(newResenia: ReseniaEntity): Promise<ReseniaEntity> {
    if (newResenia.actividad === "Finalizada") {
      throw new BussinessLogicException(
        'El codigo debe tener 10 caracteres',
        BussinessError.PRECONDITION_FAILED,
      );
    }

    const resenia = this.reseniaRepository.save(resenia);
    return resenia;
  }
}
