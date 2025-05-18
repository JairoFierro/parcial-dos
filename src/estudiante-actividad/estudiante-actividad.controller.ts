import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { EstudianteActividadService } from './estudiante-actividad.service';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteActividadController {
  constructor(
    private readonly estudianteActividadService: EstudianteActividadService,
  ) {}

  @Post(':estudianteId/actividades/:actividadId')
  async InscribirseActividad(
    @Param('estudianteId') estudianteId: number,
    @Param('actividadId') actividadId: number,
  ) {
    return await this.estudianteActividadService.InscribirseActividad(
      estudianteId,
      actividadId,
    );
  }
}
