import { IsAlphanumeric, IsEmail, IsEmpty, IsNotEmpty, IsString, Length } from 'class-validator';

export class PersonDto {
  @IsNotEmpty({ message: 'Oops al parecer no has ingresado dato en este campo' })
  @IsEmail({}, { message: 'Email ingresado es incorrecto.' })
  @Length(5, 50, { message: 'El email debe contener entre 5 y 50 caracteres' })
  readonly email: string;

  @IsNotEmpty({ message: 'Oops al parecer no has ingresado dato en este campo' })
  @IsAlphanumeric()
  @Length(6, 10, { message: 'La contraseña debe tener entre 6 y 10 caracteres' })
  readonly password: string;

  @IsNotEmpty({ message: 'Oops al parecer no has ingresado dato en este campo' })
  @Length(5, 25, { message: 'El nombre debe tener entre 5 y 25 caracteres' })
  readonly name: string;

  @IsString()
  readonly photoUrl: string;

  @IsEmpty()
  readonly provider: string;
}

export class SignInDto {
  @IsNotEmpty({ message: 'Oops al parecer no has ingresado dato en este campo' })
  @IsEmail({}, { message: 'Email ingresado es incorrecto.' })
  @Length(5, 50, { message: 'El email debe contener entre 5 y 50 caracteres' })
  readonly email: string;

  @IsNotEmpty({ message: 'Oops al parecer no has ingresado dato en este campo' })
  @IsAlphanumeric()
  @Length(6, 10, { message: 'La contraseña debe tener entre 6 y 10 caracteres' })
  readonly password: string;
}

export class VerifyEmailDto {
  @IsEmpty()
  readonly uid: number;

  @IsEmpty()
  readonly name: string;

  @IsNotEmpty({ message: 'Opps al parecer no has ingresado dato en este campo' })
  @IsEmail()
  @Length(5, 50, { message: 'El email debe contener entre 5 y 50 caracteres' })
  readonly email: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'Oops al parecer no has ingresado dato en este campo' })
  @IsAlphanumeric()
  @Length(6, 10, { message: 'La contraseña debe tener entre 6 y 10 caracteres' })
  readonly password: string;
}
