import { Module } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { ReseniaEntity } from './resenia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ReseniaService],
  imports: [TypeOrmModule.forFeature([ReseniaEntity])],
})
export class ReseniaModule {}
