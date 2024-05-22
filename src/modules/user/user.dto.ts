import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'Oops al parecer no has ingresado dato en este campo' })
  @IsAlphanumeric()
  @Length(6, 10, { message: 'La contraseña debe tener entre 6 y 10 caracteres' })
  readonly password: string;
}
