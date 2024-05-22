import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { UserDto } from 'src/user/user.dto';

export class AuthSignInDto {
  @IsEmail({ message: 'Debe ser un Email valido.' })
  @IsNotEmpty({ message: 'El campo Email es obligatorio.' })
  readonly email: string;

  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo Password es obligatorio.' })
  readonly password: string;
}

export class AuthSignUpDto extends UserDto {}
