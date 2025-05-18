import { IsNotEmpty, IsString } from 'class-validator';

export class ReseniaDto {
  @IsString()
  @IsNotEmpty()
  readonly comentario: string;

  @IsString()
  @IsNotEmpty()
  readonly calificacion: string;

  @IsString()
  @IsNotEmpty()
  readonly fecha: string;
}
