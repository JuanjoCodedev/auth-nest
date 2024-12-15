import { IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { SignInDto } from '../sign-in/sign-in.dto';

export class SignUpDto extends SignInDto {
  @IsNotEmpty({ message: 'Nombre de usuario es un campo obligatorio' })
  @Length(5, 25, { message: 'El nombre debe tener entre 5 y 25 caracteres' })
  readonly name: string;

  @IsOptional()
  @Length(5, 25, { message: 'El apellido debe tener entre 5 y 25 caracteres' })
  readonly last_name: string;

  @IsOptional()
  @IsString()
  readonly photoUrl: string;

  @IsNotEmpty({ message: 'Esta propiedad es obligatoria.' })
  @IsInt({ message: 'Esta propiedad debe ser un número entero.' })
  readonly id_country: number;

  @IsNotEmpty({ message: 'Esta propiedad es obligatoria.' })
  @IsInt({ message: 'Esta propiedad debe ser un número entero.' })
  readonly id_department: number;

  @IsNotEmpty({ message: 'Esta propiedad es obligatoria.' })
  @IsInt({ message: 'Esta propiedad debe ser un número entero.' })
  readonly id_city: number;

  @IsEmpty({ message: 'El proveedor de autenticación, es invalido.' })
  readonly provider: string;

  @IsEmpty({ message: 'La ip ingresada, es invalida.' })
  readonly ipAddress: string;
}
