import { Module } from '@nestjs/common';
import { EstudianteActividadController } from './estudiante-actividad.controller';

@Module({
  controllers: [EstudianteActividadController]
})
export class EstudianteActividadModule {}
