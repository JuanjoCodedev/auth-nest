import { IsNotEmpty, IsNumber } from 'class-validator';

export class AccessLevelRouteAccessDto {
  @IsNotEmpty({ message: 'Id_permission es un campo obligatorio.' })
  @IsNumber()
  readonly id_route_access: number;

  @IsNotEmpty({ message: 'Id_rol es un campo obligatorio.' })
  @IsNumber()
  readonly id_access_level: number;
}
