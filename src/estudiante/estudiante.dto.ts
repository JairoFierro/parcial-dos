import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class EstudianteDto {
  @IsNumber()
  @IsNotEmpty()
  readonly numCedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  programa: string;

  @IsNumber()
  @IsNotEmpty()
  semestre: number;
}
