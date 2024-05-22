import { IsEmpty, IsInt, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class UserRouteAccessDto {
  @IsEmpty({ message: 'El campo ID no debe existir.' })
  readonly id: number;

  @IsEmpty({ message: 'El campo created_at no debe existir.' })
  readonly created_at: Date;

  @IsEmpty({ message: 'El campo updated_at no debe existir.' })
  readonly updated_at: Date;

  @IsEmpty({ message: 'El campo Status no debe existir.' })
  readonly status: boolean;

  @IsInt({ message: 'Debe ser un Integer.' })
  @IsNotEmpty({ message: 'El campo User_id es obligatorio.' })
  readonly user_id: number;

  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo Route es obligatorio.' })
  readonly route: string[];
}
