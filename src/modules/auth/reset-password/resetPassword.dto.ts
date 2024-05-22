import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'El campo email es un campo obligatorio.' })
  @IsEmail({}, { message: 'Email ingresado es incorrecto.' })
  @Length(5, 50, { message: 'Email debe contener entre 5 y 50 caracteres' })
  readonly email: string;
}
