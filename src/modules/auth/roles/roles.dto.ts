import { IsNotEmpty, IsString } from 'class-validator';

export class RolesDto {
  @IsNotEmpty({ message: 'Rol es un campo obligatorio.' })
  @IsString()
  readonly name: string;
}
