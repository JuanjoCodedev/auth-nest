import { IsNotEmpty, IsString } from 'class-validator';

export class RolesDto {
  @IsNotEmpty({ message: 'El nombre del rol es un campo obligatorio.' })
  @IsString()
  readonly name: string;
}
