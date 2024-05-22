import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { UserDto } from 'src/user/user.dto';

export class AuthenticationSignInDto {
  @IsEmail({ message: 'Debe ser un Email valido.' })
  @IsNotEmpty({ message: 'El campo Email es obligatorio.' })
  readonly email: string;

  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo Password es obligatorio.' })
  readonly password: string;
}

export class AuthenticationSignUpDto extends UserDto { }

export class AuthenticationForgotPasswordDto {
  @IsEmail({ message: 'Debe ser un Email valido.' })
  @IsNotEmpty({ message: 'El campo Email es obligatorio.' })
  readonly email: string;
}

export class AuthenticationResetPasswordDto {
  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo Token es obligatorio.' })
  readonly token: string;

  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo NewPassword es obligatorio.' })
  readonly newPassword: string;
}