import { IsNotEmpty, IsString } from 'class-validator';

export class PermissionsDto {
  @IsNotEmpty({ message: 'La ruta es un campo obligatorio.' })
  @IsString()
  readonly route: string;
}
