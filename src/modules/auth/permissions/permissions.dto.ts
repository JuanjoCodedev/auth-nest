import { IsNotEmpty, IsString } from 'class-validator';

export class PermissionsDto {
  @IsNotEmpty({ message: 'Permiso es un campo obligatorio.' })
  @IsString()
  readonly route: string;
}
