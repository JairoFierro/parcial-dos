import { Module } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { ReseniaEntity } from './resenia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReseniaController } from './resenia.controller';

@Module({
  providers: [ReseniaService],
  imports: [TypeOrmModule.forFeature([ReseniaEntity])],
  controllers: [ReseniaController],
})
export class ReseniaModule {}
