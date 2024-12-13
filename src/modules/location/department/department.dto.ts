import { IsEmpty, IsNotEmpty } from 'class-validator';

export class DepartmentDto {
  @IsNotEmpty({ message: 'Este campo es obligatorio.' })
  name: string;

  @IsEmpty({ message: 'Este campo no debe existir.' })
  created_at: Date;
}
