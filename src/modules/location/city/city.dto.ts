import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CityDto {
  @IsNotEmpty({ message: 'Este campo es obligatorio.' })
  name: string;

  @IsEmpty({ message: 'Este campo no debe existir.' })
  created_at: Date;
}
