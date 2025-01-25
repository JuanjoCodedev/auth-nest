import { IsEmpty } from 'class-validator';

export class LogDto {
  @IsEmpty()
  path: string;

  @IsEmpty()
  message: string;

  @IsEmpty()
  status_code: number;

  @IsEmpty()
  client_ip: string;
}
