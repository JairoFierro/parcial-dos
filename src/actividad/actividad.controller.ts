import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
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
    const actividad = plainToInstance(ActividadEntity, actividadDTO);
    return this.actividadService.crearActividad(actividad);
  }

  @Put(':actividadId')
  async cambiarEstado(
    @Param('actividadId') actividadId: number,
    @Body() actividadDTO: ActividadDto,
  ) {
    const actividad: ActividadEntity = plainToInstance(
      ActividadEntity,
      actividadDTO,
    );
    return await this.actividadService.cambiarEstado(
      actividadId,
      actividad.estado,
    );
  }

  @Get()
  async findAllActividadesByDate(@Query('fecha') fecha: string) {
    return this.actividadService.findAllActividadesByDate(fecha);
  }
}
