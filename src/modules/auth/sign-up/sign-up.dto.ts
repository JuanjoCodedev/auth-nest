import { IsEmpty, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
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

  @IsEmpty({ message: 'El proveedor de autenticación, es invalido.' })
  readonly provider: string;

  @IsEmpty({ message: 'La ip ingresada, es invalida.' })
  readonly ipAddress: string;
}
