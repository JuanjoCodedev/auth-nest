import { IsNotEmpty, IsNumber } from 'class-validator';

export class RolPermissionsDto {
  @IsNotEmpty({ message: 'IdPermission es un campo obligatorio.' })
  @IsNumber()
  readonly id_permissions: number;

  @IsNotEmpty({ message: 'IdRol es un campo obligatorio.' })
  @IsNumber()
  readonly id_rol: number;
}
