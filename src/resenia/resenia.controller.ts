import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { ReseniaService } from './resenia.service';

@Controller('resenias')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReseniaController {
  constructor(private readonly reseniaService: ReseniaService) {}
}
