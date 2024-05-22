import { IsEmpty, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RoleRouteAccessDto {
  @IsEmpty({ message: 'El campo ID no debe existir.' })
  readonly id: number;

  @IsInt({ message: 'Debe ser un Integer.' })
  @IsNotEmpty({ message: 'El campo User_id es obligatorio.' })
  readonly role_id: number;

  @IsNotEmpty({ message: 'El campo Route es obligatorio.' })
  readonly routes: string[];
}
