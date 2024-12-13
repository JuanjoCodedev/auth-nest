import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Matches } from 'class-validator';

export class QueryDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @Matches(/^(id|stock|name)$/)
  @IsString()
  @IsOptional()
  order: string;

  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  name: string;
}
