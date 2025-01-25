import { IsNotEmpty, IsNumber } from 'class-validator';

export class RolPermissionsDto {
  @IsNotEmpty({ message: 'Id_permission es un campo obligatorio.' })
  @IsNumber()
  readonly id_permissions: number;

  @IsNotEmpty({ message: 'Id_rol es un campo obligatorio.' })
  @IsNumber()
  readonly id_rol: number;
}
