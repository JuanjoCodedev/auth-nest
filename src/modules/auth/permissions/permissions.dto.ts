import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PermissionsDto {
  @IsNotEmpty({ message: 'Permiso es un campo obligatorio.' })
  @IsString()
  readonly permissions: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
