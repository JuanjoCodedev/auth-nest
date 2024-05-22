import { IsEmpty, IsNotEmpty } from 'class-validator';

export class RoleDto {
  @IsEmpty({ message: 'El campo ID no debe existir.' })
  readonly id: number;

  @IsEmpty({ message: 'El campo created_at no debe existir.' })
  readonly created_at: Date;

  @IsEmpty({ message: 'El campo Status no debe existir.' })
  readonly status: boolean;

  @IsEmpty({ message: 'El campo updated_at no debe existir.' })
  readonly updated_at: Date;

  @IsNotEmpty({ message: 'El campo Name es obligatorio.' })
  readonly name: string;
}
