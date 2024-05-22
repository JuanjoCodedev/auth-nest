import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class UserDto {
  @IsEmpty({ message: 'El campo ID no debe existir.' })
  readonly id: number;

  @IsEmpty({ message: 'El campo created_at no debe existir.' })
  readonly created_at: Date;

  @IsEmpty({ message: 'El campo created_at no debe existir.' })
  readonly updated_at: Date;

  @IsEmpty({ message: 'El campo Status no debe existir.' })
  readonly status: boolean;

  @IsEmpty({ message: 'El campo Provider no debe existir.' })
  readonly provider: string;

  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo Name es obligatorio.' })
  readonly name: string;

  @IsString({ message: 'Debe ser un String.' })
  @IsOptional()
  readonly last_name: string;

  @IsEmail({ message: 'Debe ser un Email valido.' })
  @IsNotEmpty({ message: 'El campo Email es obligatorio.' })
  readonly email: string;

  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo Password es obligatorio.' })
  readonly password: string;
}
