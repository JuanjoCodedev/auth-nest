import { IsNotEmpty, IsNumber } from 'class-validator';

export class RolPermissionsDto {
  @IsNotEmpty({ message: 'IdPermission es un campo obligatorio.' })
  @IsNumber()
  readonly idPermission: number;

  @IsNotEmpty({ message: 'IdRol es un campo obligatorio.' })
  @IsNumber()
  readonly idRol: number;
}
