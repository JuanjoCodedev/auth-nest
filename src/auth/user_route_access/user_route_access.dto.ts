import { IsEmpty, IsInt, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class UserRouteAccessDto {
  @IsEmpty({ message: 'El campo ID no debe existir.' })
  readonly id: number;

  @IsInt({ message: 'Debe ser un Integer.' })
  @IsNotEmpty({ message: 'El campo User_id es obligatorio.' })
  readonly user_id: number;

  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo Route es obligatorio.' })
  readonly route: string[];
}
