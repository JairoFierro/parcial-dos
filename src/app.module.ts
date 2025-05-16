import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReseniaModule } from './resenia/resenia.module';
import { EstudianteActividadService } from './estudiante-actividad/estudiante-actividad.service';

@Module({
  imports: [EstudianteModule, ActividadModule, ReseniaModule],
  controllers: [AppController],
  providers: [AppService, EstudianteActividadService],
})
export class AppModule {}
