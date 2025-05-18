import { Controller, UseInterceptors } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';

@Controller('actividades')
@UseInterceptors(BusinessErrorsInterceptor)
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}
}
