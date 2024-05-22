import { IsEmail, IsEmpty, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsEnum, IsOptional } from 'class-validator';
import { UserResidenceData } from './user.enum';

export class UserDto {
  @IsEmpty({ message: 'El campo ID no debe existir.' })
  readonly id: number;

  @IsEmpty({ message: 'El campo created_at no debe existir.' })
  readonly created_at: Date;

  @IsEmpty({ message: 'El campo updated_at no debe existir.' })
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

  @IsEnum(UserResidenceData.Department, { message: 'El departamento debe ser una de las permitidas.' })
  readonly department_res: UserResidenceData.Department;

  @IsEnum(UserResidenceData.City, { message: 'La ciudad debe ser una de las permitidas.' })
  readonly city_res: UserResidenceData.City;

  readonly role_id: number;
}
