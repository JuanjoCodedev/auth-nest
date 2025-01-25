import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/* Service */
import { CityService } from './city.service';

/* Dtos */
import { CityDto } from './city.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

@ApiTags('Ubicacion')
@Controller('city')
export class CityController {
  constructor(private readonly _cityService: CityService) {}

  @Get('getCity')
  @ApiOperation({ summary: 'Obtiene y filtra las ciudades.' })
  @ApiResponse({ status: 200, description: 'Data con información obtenida.', type: QueryDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async getCity(@Query(new ValidationPipe()) query: QueryDto) {
    const mergedQuery = { limit: 10, page: 1, order: 'name', name: '', ...query };
    return this._cityService.getCity(mergedQuery);
  }

  @Post('createCity')
  @ApiOperation({ summary: 'Crea una nueva ciudad.' })
  @ApiResponse({ status: 201, description: 'Ciudad creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async cityCreate(@Body() body: CityDto) {
    return this._cityService.cityCreate(body);
  }
}
