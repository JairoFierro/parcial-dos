import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { EstudianteService } from './estudiante.service';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}
}
