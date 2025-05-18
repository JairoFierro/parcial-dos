import { Module } from '@nestjs/common';
import { ActividadReseniaController } from './actividad-resenia.controller';

@Module({
  controllers: [ActividadReseniaController]
})
export class ActividadReseniaModule {}
