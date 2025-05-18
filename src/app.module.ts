import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReseniaModule } from './resenia/resenia.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ActividadEntity } from './actividad/actividad.entity';
import { ReseniaEntity } from './resenia/resenia.entity';
import { EstudianteActividadModule } from './estudiante-actividad/estudiante-actividad.module';
import { ActividadReseniaModule } from './actividad-resenia/actividad-resenia.module';

@Module({
  imports: [
    EstudianteModule,
    ActividadModule,
    ReseniaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'jafie',
      database: 'parcial',
      entities: [EstudianteEntity, ActividadEntity, ReseniaEntity],
      dropSchema: true,
      synchronize: true,
    }),
    EstudianteActividadModule,
    ActividadReseniaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
