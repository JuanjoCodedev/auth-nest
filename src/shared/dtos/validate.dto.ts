import { IsAlphanumeric, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ValidateDto {
  @IsNotEmpty({
    message: 'Oops al parecer no has ingresado dato en este campo',
  })
  @IsEmail({}, { message: 'Oh no has ingresado un email invalido' })
  @Length(5, 50, { message: 'El email debe contener entre 5 y 50 caracteres' })
  readonly useremail: string;

  @IsNotEmpty({
    message: 'Oops al parecer no has ingresado dato en este campo',
  })
  @IsAlphanumeric()
  @Length(6, 10, {
    message: 'La contraseña debe tener entre 6 y 10 caracteres',
  })
  readonly userpassword: string;

  @IsNotEmpty({
    message: 'Oops al parecer no has ingresado dato en este campo',
  })
  @Length(5, 25, { message: 'El nombre debe tener entre 5 y 10 caracteres' })
  readonly username: string;

  readonly state: boolean;
}
