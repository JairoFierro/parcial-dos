import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReseniaEntity } from './resenia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReseniaService {
  constructor(
    @InjectRepository(ReseniaEntity)
    private readonly reseniaRepository: Repository<ReseniaEntity>,
  ) {}
}
