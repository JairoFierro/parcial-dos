import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { ActividadDto } from './actividad.dto';
import { ActividadEntity } from './actividad.entity';
import { plainToInstance } from 'class-transformer';

@Controller('actividades')
@UseInterceptors(BusinessErrorsInterceptor)
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  crearActividad(@Body() actividadDTO: ActividadDto) {
    const actividad =plainToInstance(ActividadEntity, actividadDTO);
    return this.actividadService.crearActividad(actividad);
  }
}
