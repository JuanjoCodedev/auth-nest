import { IsAlphanumeric, IsEmail, IsNotEmpty, Length } from "class-validator";

export class SignInDto {
  @IsNotEmpty({ message: 'Email es un campo obligatorio.' })
  @IsEmail({}, { message: 'Email ingresado es incorrecto.' })
  @Length(5, 50, { message: 'Email debe contener entre 5 y 50 caracteres' })
  readonly email: string;

  @IsNotEmpty({ message: 'Contraseña es un campo obligatorio' })
  @IsAlphanumeric()
  @Length(6, 10, { message: 'El campo contraseña debe tener entre 6 y 10 caracteres' })
  readonly password: string;
}
