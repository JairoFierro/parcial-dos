import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';

@Controller('actividades')
@UseInterceptors(BusinessErrorsInterceptor)
export class ActividadReseniaController {}
