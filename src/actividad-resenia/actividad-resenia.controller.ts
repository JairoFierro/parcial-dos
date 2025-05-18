import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { ActividadReseniaService } from './actividad-resenia.service';
import { ReseniaEntity } from 'src/resenia/resenia.entity';

@Controller('actividades')
@UseInterceptors(BusinessErrorsInterceptor)
export class ActividadReseniaController {
  constructor(
    private readonly actividadReseniaService: ActividadReseniaService,
  ) {}

  @Post()
  agregarResenia(@Body() resenia: ReseniaEntity): Promise<ReseniaEntity> {
    return this.actividadReseniaService.agregarResenia(resenia);
  }
}
