import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { EstudianteActividadService } from './estudiante-actividad.service';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteActividadController {
  constructor(
    private readonly estudianteActividadService: EstudianteActividadService,
  ) {}
}
