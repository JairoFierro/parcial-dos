import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteDto } from './estudiante.dto';
import { plainToInstance } from 'class-transformer';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(@Body() estudianteDTO: EstudianteDto) {
    const estudiante = plainToInstance(EstudianteEntity, estudianteDTO);
    return this.estudianteService.crearEstudiante(estudiante);
  }

  @Get(':estudianteId')
  async findEstudianteById(@Param('estudianteId') estudianteId: number) {
    return await this.estudianteService.findEstudianteById(estudianteId);
  }
}
